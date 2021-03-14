import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../models/activity';

interface Prop {
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({createOrEdit, submitting}: Prop) {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm} = activityStore;

    const initailState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        venue: '',
        city: '',
        category: ''
    }

    const [activity, setActivity] = useState(initailState);

    function handleSubmit() {
        console.log(activity)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target
        setActivity({...activity, [name]: value}) //
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.TextArea placeholder='description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Form.Input placeholder='city' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='category' value={activity.category} name='category' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onClick={() => createOrEdit(activity)} />
                <Button floated='right' type='button' content='Cancel' onClick={() => closeForm()} />
            </Form>
        </Segment>
    )
}