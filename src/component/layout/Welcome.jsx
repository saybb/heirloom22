/* 
Almost static welcome page that links to other components
* Backend Dependency
   1. auth 
      - uid checking for authentication
      - name
   2. profile
      - name
* Purpose
   1. Welcomes page
   2. Manual page
 */

// react
import React, {Component} from "react";
import {NavLink} from "react-router-dom";

// redux
import {connect} from "react-redux";
import {signOut} from "../../store/Actions/authActions";
// style
import {Button, Row, Col, Icon} from "antd";
import "./Welcome.css";
import logo from "../../heirloom22_logo.svg";

class Welcome extends Component {
   style = {
      textAlign: "center"
   };

   capitalize(string) {
      // https://paulund.co.uk/index.php/how-to-capitalize-the-first-letter-of-a-string-in-javascript
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   welcomeMessage = () => {
      // the profile information
      const {profile, auth} = this.props;
      let name;
      if (auth && auth.displayName) name = auth.displayName;
      else if (profile && profile.name) name = profile.name;
      else name = "Visiter";
      name = this.capitalize(name);

      // Welcome message
      if (!auth.uid) {
         return (
            <h2 className='Title'>
               Hi {name}. Please log in to start using this application.
               <p className='Description'>
                  If you don't can't login you can try (1) reset the password
                  (2) ask a family member to create a new account for you
               </p>
            </h2>
         );
      }
      return (
         <h2>
            Hi {name}. Here is an overview of how you can navigate through your
            family artefacts and find out more about your family history
         </h2>
      );
   };

   // onMount and unMount are handlers passed from App.js
   componentDidMount() {
      this.props.onMount();
   }
   componentWillUnmount() {
      this.props.unMount();
   }

   tutorial = () => {
      const {auth} = this.props;

      // user not logged in
      if (!auth.uid) {
         return (
            <div className='Tutorial'>
               {/* use ant-design grid layout */}
               <Row type='flex'>
                  <Col span={4}>
                     <Icon type='login' />
                  </Col>
                  <Col span={20}>
                     <Row className='title'>Log in</Row>
                     <Row>
                        Click on
                        <Button className='LeftRightMargin'>
                           <NavLink to='/signin'>Log in</NavLink>
                        </Button>
                        to start using this application.
                     </Row>
                  </Col>
               </Row>
            </div>
         );
      }
      // user logged in

      return (
         <div className='Tutorial'>
            {/* use ant-design grid layout */}
            <Row type='flex'>
               <Col span={4}>
                  <Icon type='home' />
               </Col>
               <Col span={20}>
                  <Row className='title'>Homepage</Row>
                  <Row>
                     Click on
                     <Button className='LeftRightMargin'>
                        <NavLink to='/'>Home</NavLink>
                     </Button>
                     to come back to this page.
                  </Row>
               </Col>
            </Row>
            <Row type='flex' justify='center'>
               <Col span={4}>
                  <Icon type='picture' />
               </Col>
               <Col span={20}>
                  <Row className='title'>Gallery</Row>
                  <Row>
                     Click on
                     <Button className='LeftRightMargin'>
                        <NavLink to='/feed'>List View</NavLink>
                     </Button>
                     to go to the Gallery where you can view all the artefacts
                     and its related people and events.
                  </Row>
               </Col>
            </Row>
            <Row type='flex' justify='center'>
               <Col span={4}>
                  <Icon type='logout' />
               </Col>
               <Col span={20}>
                  <Row className='title'>Log out</Row>
                  <Row>
                     Click on
                     <Button
                        type='danger'
                        onClick={this.props.signOut}
                        className='LeftRightMargin'
                     >
                        Log out
                     </Button>
                     to exit this application correctly.
                  </Row>
               </Col>
            </Row>
            <Row type='flex' justify='center'>
               <Col span={4}>
                  <Icon type='user-add' />
               </Col>
               <Col span={20}>
                  <Row className='title'>Create new accounts</Row>
                  <Row>
                     Click on
                     <Button className='LeftRightMargin'>
                        <NavLink to='/signup'>Sign up</NavLink>
                     </Button>
                     create new accounts for your family members.
                  </Row>
               </Col>
            </Row>
         </div>
      );
   };

   // I am using a lot of div containers to achieve the desired UI
   render() {
      // return the webpage
      return (
         <div className='Welcome'>
            <div className='Background'>
               <div className='Intro'>
                  <img className='logo' src={logo} alt='logo' />
                  <h1 className='Center'>Welcome to Heirloom22!</h1>
                  {this.welcomeMessage()}.
                  <div className='Hidden'>
                     .{/* A trick to draw an "empty" box */}
                  </div>
               </div>
            </div>
            <this.tutorial />
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
   };
};

const mapDispatchToProps = dispatch => {
   return {
      signOut: () => dispatch(signOut())
   };
};
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Welcome);
