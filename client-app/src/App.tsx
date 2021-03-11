import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

interface Activity {
  id:string;
  title:string
}

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
    .get('http://localhost:5000/api/activities')
    .then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map((activity: Activity) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
