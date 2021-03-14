import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSlectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false); // for primary type no need to declare type
  const [submitting, setSubmitting] = useState(false);

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
    activityStore.loadActivities();
  }, [activityStore]) // activityStore as depandancy

  if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading App' />;

  return (
    <>
      <NavBar />
      <Container style={{margin: '7em'}}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
