import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function ActivityForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='id' />
                <Form.TextArea placeholder='title' />
                <Form.Input placeholder='date' />
                <Form.Input placeholder='description' />
                <Form.Input placeholder='venue' />
                <Form.Input placeholder='city' />
                <Form.Input placeholder='category' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}