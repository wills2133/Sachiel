import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider, Grid, Header, Image, Segment, Statistic } from 'semantic-ui-react';
import { Profile } from '../../models/profile';
import FollowButton from './FollowButton';

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={3}>
                    <Image src={profile.image || '/assets/user.png'} />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Header size='huge' content={profile.displayName}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingsCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
})