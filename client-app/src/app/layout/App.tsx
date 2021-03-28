import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivitiesDetails from '../../features/activities/dtails/ActivityDetails';
import TestErrors from '../../features/errors/TestErrors';
import {ToastContainer} from 'react-toastify'
import Notfound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

function App() {
  const location = useLocation();
  const { userStore, commonStore } = useStore();

   useEffect(() => { // watch proper change and react with action in component
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
   }, [userStore, commonStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading App..." />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
          <NavBar />
          <Container style={{margin: '7em'}}>
            <Switch>
              <PrivateRoute exact path='/activities' component={ActivityDashboard} /> {/*exact for /a when there is a/id */}
              <PrivateRoute path='/activities/:id' component={ActivitiesDetails} />
              <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <PrivateRoute path='/profiles/:username' component={ProfilePage} />
              <PrivateRoute path='/errors' component={TestErrors} />
              <Route path='/server-error' component={ServerError} />
              <Route component={Notfound} />
            </Switch>
          </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
