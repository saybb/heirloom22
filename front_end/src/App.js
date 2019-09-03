import React from 'react';
import './App.css';

/* Components */
import Navigation from "./Navigation.js";
import ArtefactList from "./feed/ArtefactList.js";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ArtefactList />
    </div>
  );
}

export default App;
