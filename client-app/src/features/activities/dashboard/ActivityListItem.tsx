import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, ItemGroup, Segment, SegmentGroup } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../models/activity';

interface Props {
    activity: Activity;
}

export default function ActivityListItem({activity}: Props) {

    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                        </Item.Content>
                        <Item.Description>
                            Host by ...
                        </Item.Description>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {activity.date}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendee 
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </SegmentGroup>
        // <Item key={activity.id}>
        //     <Item.Content>
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city}, {activity.venue}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             <Button
        //                 floated='right'
        //                 content='View'
        //                 color='blue'
        //                 as={Link}
        //                 to={`activities/${activity.id}`} />
        //             <Button
        //                 name={activity.id}
        //                 floated='right'
        //                 content='Delete'
        //                 color='red'
        //                 loading={loading && target === activity.id}
        //                 onClick={(e) => handleDelete(e, activity.id)} />
        //             <Label basic content={activity.category} />
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>
    )
}
