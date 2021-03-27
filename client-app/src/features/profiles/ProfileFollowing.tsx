import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileCard from './ProfileCard';

export default observer(function ProfileFollowing() {
    const {profileStore:{
        loadingFollowing, profile, followings, loadFollowings
    }} = useStore();

    useEffect(() => {
        loadFollowings('followings');
    }, [loadFollowings])

    return (
        <Tab.Pane loading={loadingFollowing}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={`People following ${profile?.displayName}`}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(following => (
                            <ProfileCard key={following?.username} profile={following} />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})