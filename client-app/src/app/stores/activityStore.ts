import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../../models/activity';
import agent from '../api/agent';

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
            Date.parse(a.date) - Date.parse(b.date));
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

    // selectActivity = (id: string) => {
    //     // this.selectedActivity = this.activities.find((activity) => activity.id === id);
    //     this.selectedActivity = this.activityRegistry.get(id);
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // openForm = (id?: string) => {
    //     id? this.selectActivity(id) : this.cancelSelectedActivity()
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

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
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity)
    }

    createActivity = async (activity: Activity) => {
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity)
                // this.selectActivity(activity.id);
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // this.activities = [...this.activities
                //     .filter((elem) => elem.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity)
                // this.selectActivity(activity.id);
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities
                //     .filter((elem) => elem.id !== id)];
                this.activityRegistry.delete(id)
                // if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}