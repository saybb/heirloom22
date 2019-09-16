import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

/* Components */
import Navigation from "./Navigation.js";
import ArtefactList from "./feed/ArtefactList.js";
import Artefact from "./data/Artefact.js";

class App extends React.Component {
  state = {
    // maintain a list of "pages" and which one is active
    active: "artefact",
    pages: {
      artefactList: <ArtefactList />,
      artefact: <Artefact />
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
