import { observer } from 'mobx-react-lite';
import React, {useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'; 
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { ActivityFormValues } from '../../../models/activity';

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity, loadingInitial, setLoadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('You need to inpt title'),
        date: Yup.string().required('Please select a time').nullable(),
        description: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
        category: Yup.string().required(),
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
        } else {
            setLoadingInitial(false);
        }
            
    }, [id, loadActivity, setLoadingInitial]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activityt...' />
 
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        {/* <FormField>
                            <Field placeholder='Title' name='title'/>
                            <ErrorMessage name='title'
                                render={error => <Label basic color='red' content={error} />} />
                        </FormField> */}
                        <MyTextInput name='title' placeholder='Title' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa' />
                        <MyTextArea rows={3} placeholder='description' name='description' />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='venue' name='venue' />
                        <MyTextInput placeholder='city' name='city' />
                        <Button
                            disabled={!isValid || isSubmitting || !dirty}
                            loading={isSubmitting}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})