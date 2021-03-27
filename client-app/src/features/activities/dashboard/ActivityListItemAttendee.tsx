import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Popup } from 'semantic-ui-react';
import { Profile } from '../../../models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees} : Props) {
    const styles = {
        borderColor: 'orange',
        borderWidth: 2
    }
    return (
        <List horizontal>
            {attendees.map((attendee) => (
                <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Image
                                size='mini'
                                circular
                                bordered
                                src={attendee.image || `/assets/user.png`}
                                style={attendee.following ? styles : null} />
                        </List.Item>
                    }
                >
                    <Popup.Content style={{width: 150}} >
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})