import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { Button, Reveal } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { Profile } from '../../models/profile';

interface Props {
    profile: Profile
}

export default observer(function FollowingButton({profile}: Props) {
    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        updateFollowing(username, !!profile.following);
    }

    if (userStore.user?.username === profile.username) return null;

    return (
        <Reveal animated='move'>
            <Reveal.Content visible style={{width: '100%'}}>
                <Button
                    fluid
                    color='teal'
                    content={profile.following ? 'Following' : 'Not following'} />
            </Reveal.Content>
            <Reveal.Content hidden style={{width: '100%'}}>
                <Button
                    onClick={e => handleFollow(e, profile.username)}
                    fluid
                    basic
                    loading={loading}
                    color={profile.following ? 'red' : 'green'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                />
            </Reveal.Content>
        </Reveal>
    )
})