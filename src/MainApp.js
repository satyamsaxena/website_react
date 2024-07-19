import React from 'react';
import App from './App';

let obj = {
  name: 'satyam',
  profession: 'Engineer',
  contact: '8923680245',
  education: 'MCA',
  avatar : 'https://i.imgur.com/7vQD0fPs.jpg',
  description : 'Gregorio Y. Zara'
};


function MainApp() {
  return <App data={obj} />;
}

export default MainApp;
