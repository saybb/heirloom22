// react
import React, {Component} from "react";
import {NavLink} from "react-router-dom";

// redux
import {connect} from "react-redux";

// style
import {Button, Row, Col, Icon} from "antd";
import "./Welcome.css";
import logo from "../../heirloom22_logo.svg";
import {thisExpression} from "@babel/types";

class Welcome extends Component {
   style = {
      textAlign: "center"
   };

   capitalize(string) {
      // https://paulund.co.uk/index.php/how-to-capitalize-the-first-letter-of-a-string-in-javascript
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   grabName = () => {
      // the profile information
      const {profile, auth} = this.props;
      let name;
      if (auth && auth.displayName) name = auth.displayName;
      if (profile && profile.name) name = profile.name;
      else name = "Visiter";
      // capalize
      return this.capitalize(name);
   };

   // onMount and unMount are handlers passed from App.js
   componentWillMount() {
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
                        <Button>
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
                     <Button>
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
                     <Button>
                        <NavLink to='/feed'>List View</NavLink>
                     </Button>
                     to go to Gallery where you can view all the artefacts and
                     its related people and events.
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
                     <Button type='danger'>
                        <NavLink to='/signup'>Log out</NavLink>
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
                     <Button>
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
                  <h1>Welcome to Heirloom22!</h1>
                  {/* Display name */}
                  <h2>
                     Hi, {this.grabName()}. Here is an overview of how you can
                     navigate through your family artefacts and find out more
                     about your family history.
                  </h2>
                  {/* A trick to draw an "empty" box */}
                  <div className='Hidden'>.</div>
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

export default connect(mapStateToProps)(Welcome);
