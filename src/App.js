import React from 'react';
import './App.css';

// Components
import Header from './components/Header'
import Main from './components/Main'

function App() {

  const headerContent = {
    title: 'Hello World',
    description: 'This is a description',
  }

  return (
    <div>
        {/* Using spread operator to pass contents of object as props */}
        <Header {...headerContent} />

        {/* Manual passing of variables as props */}
        <Main greeting="Hi this is a prop passed from app.js" numberGiven={3} />
    </div>
  );
}

export default App;