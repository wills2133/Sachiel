import React from 'react';
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
import LoginForm from '../../features/users/LoginForm';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
            <NavBar />
            <Container style={{margin: '7em'}}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} /> {/*exact for /a when there is a/id */}
                <Route path='/activities/:id' component={ActivitiesDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
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
