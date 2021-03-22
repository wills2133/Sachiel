import { makeAutoObservable, runInAction } from 'mobx';
import { Activity, ActivityFormValues } from '../../models/activity';
import agent from '../api/agent';
import {format} from 'date-fns';
import { store } from './store';
import { Profile } from '../../models/profile';

export default class ActivityStore {
    // activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    activityRegistry = new Map<string, Activity>();
    editMode = false;
    loading = false;
    submitting = false;
    loadingInitial = true;
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
        a.date!.getTime() - b.date!.getTime());
    }

    get groupedAcivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy hh:mm aa');
                activities[date] = activities[date] ?
                    [...activities[date], activity] : [activity]
                return activities;
            }, {} as {[key: string]: Activity[]})
            //}, <{[key: string]: Activity[]}>{}) //use type casting to declare type
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            // runInAction(() => {
            // })
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false); //make it a function rather than manipulating a property in async
        } catch(error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            // this.setLoadingInitial(false);
            return activity
        } else {
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() =>{
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
        
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees?.some(attendee =>
                attendee.username === user.username)
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(attendee => 
                attendee.username === activity.hostUsername);
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity)
    }

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = {...this.getActivity(activity.id), ...activity} as Activity;
                    this.activityRegistry.set(activity.id, updatedActivity);
                    this.selectedActivity = updatedActivity;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = 
                        this.selectedActivity?.attendees?.filter(attendee =>
                            attendee.username !== user?.username);
                    this.selectedActivity!.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                        this.selectedActivity?.attendees?.push(attendee);
                        this.selectedActivity!.isGoing = true;
                }
            })
            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }
}