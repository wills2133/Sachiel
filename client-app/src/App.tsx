import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((activity: Activity) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
