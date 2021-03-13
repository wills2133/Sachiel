import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import ActivitiesDetails from '../dtails/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void; // no need optional
    closeForm: () => void;
    deleteActivity: (id: string) => void;
}
// export default function ActivityDashboard(props: Props) {
export default function ActivityDashboard({
        activities,
        selectedActivity,
        selectActivity,
        cancelSelectActivity,
        editMode,
        openForm,
        closeForm,
        deleteActivity
    }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
                {/* <List>
                    {props.activities.map((activity) => {}}
                </List> */}
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivitiesDetails
                    activity={selectedActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                />}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    )
}
