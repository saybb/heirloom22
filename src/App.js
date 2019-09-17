/* * *
 * App :: ReactJS Component
 * Main component for the project.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

/* Components */
import Navigation from "./component/layout/Navigation.js";
import ArtefactList from "./component/feed/ArtefactList.js";
import Artefact from "./component/objects/Artefact.js";
import Event from "./component/objects/Event.js";
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import CreateArtefact from './component/objects/CreateArtefact';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navigation />

                    <Switch>
                        <Route path="/" exact component={CreateArtefact}/>
                        <Route path="/feed" component={ArtefactList}/>
                        <Route path="/view/artefact" component={Artefact}/>
                        <Route path="/view/event" component={Event}/>

                        <Route path='/signin' component={SignIn} />
                        <Route path='/signup' component={SignUp} />

                        {/* default to "/" if unrecognised route. */}
                        <Route render={() => <Redirect to="/"/>}/>
                    </Switch>
                </div>
            </Router>
        );
    };
}

export default App;
