import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSlectedActivity] = useState<Activity | undefined>(undefined);

  function handleSelectActivity(id: string) {
    setSlectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelActivity() {
    setSlectedActivity(undefined);
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
      <NavBar />
      <Container style={{margin: '7em'}}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
        />
      </Container>
    </>
  );
}

export default App;
