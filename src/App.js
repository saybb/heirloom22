/* * *
 * App :: ReactJS Component
 * Main component for the project.
 */
import React from "react";
import {
   BrowserRouter as Router,
   Route,
   Switch,
   Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import "./App.css";
import "antd/dist/antd.css";

/* Components */
import Navigation from "./component/layout/Navigation.js";
import ArtefactList from "./component/feed/ArtefactList.js";
import Welcome from "./component/layout/Welcome";
import Artefact from "./component/objects/Artefact.js";
import Event from "./component/objects/Event.js";
import Person from "./component/objects/Person.js";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Avatar from "./component/util/Avatar";

class App extends React.Component {
   render() {
      return (
         <Router>
            <Navigation />
            <div className="App">
               <this.HomeRoutes />
            </div>
         </Router>
      );
   }

   HomeRoutes = () => {
      const { auth } = this.props;

      if (auth.uid) {
         return (
            <Switch>
               <Route path="/" exact component={Welcome} />
               <Route path="/feed" component={ArtefactList} />
               <Route path="/view/artefacts/:id" component={Artefact} />

               <Route path="/view/events/:id" component={Event} />
               <Route path="/view/people/:id" component={Person} />

               <Route path="/signup" component={SignUp} />
               <Route path="/upload" component={Avatar} />

               {/* default to "/" if unrecognised route. */}
               <Route render={() => <Redirect to="/" />} />
            </Switch>
         );
      } else {
         return (
            <Switch>
               {/* Welcome page goes here... */}
               <Route path="/" exact component={Welcome} />
               <Route path="/signin" component={SignIn} />

               {/* default to "/" if unrecognised route. */}
               <Route render={() => <Redirect to="/" />} />
            </Switch>
         );
      }
   };
}

const mapStateToProps = state => {
   return {
      auth: state.firebase.auth
   };
};
export default compose(connect(mapStateToProps))(App);
