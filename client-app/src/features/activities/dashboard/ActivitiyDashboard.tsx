import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../models/activity';
import ActivitiesDetails from '../dtails/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';

interface Props {
    activities: Activity[];
    submitting: boolean;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}
export default observer(function ActivityDashboard({
    activities,
    createOrEdit,
    submitting,
    deleteActivity}: Props) {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivitiesDetails />}
                {editMode &&
                <ActivityForm
                    submitting={submitting}
                    createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
})
