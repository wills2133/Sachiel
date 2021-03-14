import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';

interface Prop {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({activities, selectActivity, submitting, deleteActivity}: Prop) {
    const [target, setTarget] = useState('');

    function handleDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name)
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => 
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    floated='right'
                                    content='View'
                                    color='blue'
                                    onClick={() => selectActivity(activity.id)} />
                                <Button
                                    name={activity.id}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => handleDelete(e, activity.id)} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
        </Segment>
    )
}