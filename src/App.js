import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

/* Components */
import Navigation from "./component/layout/Navigation";
import Artefact from "./component/artefacts/Artefact.js"
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
//import userProfile from './component/profile/userProfile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Artefact} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            {/* <Route path='/profile' component={userProfile} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
