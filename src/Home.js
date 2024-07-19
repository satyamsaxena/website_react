import React, { useEffect, useState } from 'react';
import './App.css';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const usersWithExtraData = data.map(user => ({
          ...user,
          profession: 'Engineer',
          education: 'MCA'
        }));
        setUsers(usersWithExtraData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h1 className="heading">Hi {user.name}</h1>
          <h2 className="subtext">{user.profession}</h2>
          <h3 className="subtext">{user.phone}</h3>
          <h3 className="subtext">{user.education}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
