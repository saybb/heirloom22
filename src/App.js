import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

/* Components */
import Navigation from "./component/layout/Navigation.js";
import ArtefactList from "./component/feed/ArtefactList.js";
import Artefact from "./component/objects/Artefact.js";
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navigation />

                    <Switch>
                        <Route path="/" exact component={ArtefactList}/>
                        <Route path="/feed" component={ArtefactList}/>
                        <Route path="/view/artefact" component={Artefact}/>

                        <Route path='/signin' component={SignIn} />
                        <Route path='/signup' component={SignUp} />
                    </Switch>
                </div>
            </Router>
        );
    };
}

export default App;
