import { makeAutoObservable } from 'mobx';
import { Activity } from '../../models/activity';
import agent from '../api/agent';

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    submitting = false;
    loadingInitial = false;
    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            // runInAction(() => {
            // })
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity)
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

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find((activity) => activity.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectActivity(id) : this.cancelSelectedActivity()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }
}