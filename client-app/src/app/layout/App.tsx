import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSlectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false); // for primary type no need to declare type
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleSelectActivity(id: string) {
    setSlectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelActivity() {
    setSlectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity()
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity)
      .then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]); // [...] generate a new array
        setSlectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]); // [...] generate a new array
        setSlectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id)
    .then(() => {
      setActivities([...activities].filter(x => x.id !== id)) // [...] generate a new array
      setSubmitting(false);
    })
  }

  useEffect(() => {
    // axios
    // .get<Activity[]>('http://localhost:5000/api/activities') // typeof response.data is Activity
    agent.Activities.list()
    .then((response) => {
      let Activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        Activities.push(activity)
      })
      setActivities(Activities);
      setLoading(false);
    });
  }, [])

  if(loading) return <LoadingComponent content = 'Loading App' />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{margin: '7em'}}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
