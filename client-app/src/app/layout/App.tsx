import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSlectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false); // for primary type no need to declare type

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

  function handleDeleteActivity(id: string) {
    setActivities([...activities].filter(x => x.id !== id)) // [...] generate a new array
  }

  useEffect(() => {
    axios
    .get<Activity[]>('http://localhost:5000/api/activities') // typeof response.data is Activity
    .then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, [])

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
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
