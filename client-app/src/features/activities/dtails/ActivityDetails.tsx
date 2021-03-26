import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivitiesDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedChat activityId={activity.id} />
                <ActivityDetailedInfo activity={activity}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity}/>
            </Grid.Column>
        </Grid>
        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        //     <Card.Content>
        //         <Card.Header>{activity.title}</Card.Header>
        //         <Card.Meta>
        //             <span>{activity.date}</span>
        //         </Card.Meta>
        //         <Card.Description>{activity.description}</Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group widths='2'>
        //             <Button as={Link} to={`/manage/${id}`} basic color='blue' content='Edit' />
        //             <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
        //         </Button.Group>
        //     </Card.Content>
        // </Card>
    )
})