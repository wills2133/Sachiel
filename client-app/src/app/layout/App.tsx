import React, { Fragment, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]) // activityStore as depandancy

  if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading App' />;

  return (
    <>
      <NavBar />
      <Container style={{margin: '7em'}}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
