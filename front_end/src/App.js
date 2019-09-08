import React from 'react';
import './App.css';

/* Components */
import Navigation from "./Navigation.js";
import ArtefactList from "./feed/ArtefactList.js";

class App extends React.Component {
  state = {
    // maintain a list of "pages" and which one is active
    active: "artefactList",
    pages: {
      artefactList: <ArtefactList />
    }
  }

  render() {
    const {active, pages} = this.state;

    return (
      <div className="App">
        <Navigation />
        { // show only the active component
          pages[active]
        }
      </div>
    );
  };
}

export default App;
