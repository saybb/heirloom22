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
import {connect} from "react-redux";
import {compose} from "redux";
import "./App.css";
import "antd/dist/antd.css";
import {Layout, Affix} from "antd";

/* Components */
import Navigation from "./component/layout/Navigation.js";
import ArtefactList from "./component/feed/ArtefactList.js";
import Welcome from "./component/layout/Welcome";
import Artefact from "./component/objects/Artefact.js";
import Event from "./component/objects/Event.js";
import Person from "./component/objects/Person.js";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import ImageUpload from "./component/util/imageUpload";

const {Content, Footer} = Layout;

class App extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         style: {backgroundColor: "white"}
      };
   }

   // Rational:
   // I want to customize the style of App.js contain based on the component
   remove_width_constraint_handler = () => {
      this.setState({
         style: {width: "100%", backgroundColor: "white"}
      });
   };
   reset_width_constraint_handler = () => {
      this.setState({style: {backgroundColor: "white"}});
   };
   render() {
      return (
         <Router>
            <Layout style={{backgroundColor: "white"}}>
               <Navigation />
               <Content className='App' style={this.state.style}>
                  <this.HomeRoutes />
               </Content>
               <Footer
                  style={{textAlign: "center", backgroundColor: "aliceblue"}}
               >
                  CALL ©2019
               </Footer>
            </Layout>
         </Router>
      );
   }

   HomeRoutes = () => {
      const {auth} = this.props;

      if (auth.uid) {
         return (
            <Switch>
               <Route
                  path='/'
                  exact
                  // a trick to pase handler to children
                  // https://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component
                  render={props => (
                     <Welcome
                        onMount={this.remove_width_constraint_handler}
                        unMount={this.reset_width_constraint_handler}
                        {...props}
                     />
                  )}
               />
               <Route path='/feed' component={ArtefactList} />
               <Route path='/view/artefacts/:id' component={Artefact} />

               <Route path='/view/events/:id' component={Event} />
               <Route path='/view/people/:id' component={Person} />

               <Route path='/signup' component={SignUp} />
               <Route path='/upload' component={ImageUpload} />

               {/* default to "/" if unrecognised route. */}
               <Route render={() => <Redirect to='/' />} />
            </Switch>
         );
      } else {
         return (
            <Switch>
               {/* Welcome page goes here... */}
               <Route
                  path='/'
                  exact
                  // a trick to pase handler to children
                  // https://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component
                  render={props => (
                     <Welcome
                        onMount={this.remove_width_constraint_handler}
                        unMount={this.reset_width_constraint_handler}
                        {...props}
                     />
                  )}
               />
               <Route path='/signin' component={SignIn} />

               {/* default to "/" if unrecognised route. */}
               <Route render={() => <Redirect to='/' />} />
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
