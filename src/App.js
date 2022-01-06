import React from 'react';
import {
  BrowserRouter,
  Routes,
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

  const HomeComponent = () => {
    return (
      <div>
        {/* Using spread operator to pass contents of object as props */}
        <Header {...headerContent} />

        {/* Manual passing of variables as props */}
        <Main greeting="Hi this is a prop passed from app.js" numberGiven={3} />
      </div>
    )
  }

  return (
    // Using react-router-dom v6 here. <Switch> is replaced by <Routes>, many more breaking changes found in docs
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/grid" element={<CssGrid />} />
      </Routes>
    </BrowserRouter>
  )
 }

export default App;