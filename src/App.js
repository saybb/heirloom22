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
import Artefact from "./component/objects/Artefact.js";
import Event from "./component/objects/Event.js";
import Person from "./component/objects/Person.js";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Avatar from "./component/objects/Avatar";
import Welcome from "./component/layout/Welcome";

class App extends React.Component {
   render() {
      return (
         <Router>
            {/* display navigation bar */}
            <Navigation />
            {/* display components according to the path specified */}
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
            // matches the path to the components!!
            // like a case statement
            // https://reacttraining.com/react-router/web/guides/quick-start
            <Switch>
               <Route path="/" exact component={ArtefactList} />
               <Route path="/feed" component={ArtefactList} />
               <Route path="/view/artefacts/:id" component={Artefact} />
               <Route path="/view/events/:id" component={Event} />
               <Route path="/view/people/:id" component={Person} />

               <Route path="/signup" component={SignUp} />
               <Route path="/upload" component={Avatar} />
               <Route path="/welcome" component={Welcome} />

               {/* default to "/" if unrecognised route. */}
               <Route render={() => <Redirect to="/" />} />
            </Switch>
         );
      } else {
         return (
            <Switch>
               {/* Welcome page goes here... */}
               <Route path="/" exact component={SignIn} />
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
