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
}
// export default function ActivityDashboard(props: Props) {
export default function ActivityDashboard({activities,
    selectedActivity, selectActivity, cancelSelectActivity,}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
                {/* <List>
                    {props.activities.map((activity) => {}}
                </List> */}
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && <ActivitiesDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}
