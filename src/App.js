import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

// Components
import Header from './components/react-fundamentals/Header'
import Main from './components/react-fundamentals/Main'
import CssGrid from './components/css-grid'

function App() {

  const headerContent = {
    title: 'Hello World',
    description: 'This is a description',
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
              {/* Using spread operator to pass contents of object as props */}
              <Header {...headerContent} />

              {/* Manual passing of variables as props */}
              <Main greeting="Hi this is a prop passed from app.js" numberGiven={3} />
          </div>
        </Route>
        <Route path="/grid" component={CssGrid} />
      </Switch>
    </Router>
  );
}

export default App;