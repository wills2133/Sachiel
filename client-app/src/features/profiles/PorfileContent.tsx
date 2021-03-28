import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { Profile } from '../../models/profile';
import ProfileFollowing from './ProfileFollowing';
import ProfilePhotos from './ProfilePhotos';
import UserActivities from './UserActivities';

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const {profileStore} = useStore();

    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem: 'Photos', render: () => <Tab.Pane><ProfilePhotos profile={profile}/></Tab.Pane>},
        {menuItem: 'Events', render: () => <Tab.Pane><UserActivities /></Tab.Pane>},
        {menuItem: 'Followers', render: () => <Tab.Pane><ProfileFollowing /></Tab.Pane>},
        {menuItem: 'Following', render: () => <Tab.Pane><ProfileFollowing /></Tab.Pane>}
    ];

    return (
        <Tab
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
            menu={{fluid: true, vertical:true}}
            menuPosition='right'
            panes={panes}
        />
    )
})