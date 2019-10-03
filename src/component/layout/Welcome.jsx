// react
import React, {Component} from "react";
import {NavLink} from "react-router-dom";

// redux
import {connect} from "react-redux";

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

   grabName = () => {
      // the profile information
      const {profile, auth} = this.props;
      let name;
      if (auth.displayName) name = auth.displayName;
      else name = profile.name;
      // capalize
      return this.capitalize(name);
   };

   render() {
      // return the webpage
      return (
         <div className='Welcome'>
            <div className='Intro'>
               <img className='logo' src={logo} alt='logo' />
               <h1>Welcome to Heirloom22!</h1>
               {/* Display name */}
               <h2>
                  Hi, {this.grabName()}. Here is an overview of how you can
                  navigate through your family artefacts and find out more about
                  your family history
               </h2>
            </div>
            <div className='Tutorial'>
               <Row type='flex' justify='center'>
                  <Col span={4}>
                     <Icon type='home' />
                  </Col>
                  <Col span={12}>
                     Click on
                     <Button>
                        <NavLink to='/'>Home</NavLink>
                     </Button>
                     to come back to this page
                  </Col>
                  <Col>
                     Click on
                     <Button>
                        <NavLink to='/feed'>List View</NavLink>
                     </Button>
                     to go to Gallery
                  </Col>
                  <Col>
                     Click on
                     <Button type='danger'>
                        <NavLink to='/signup'>Log out</NavLink>
                     </Button>
                     to exit this application
                  </Col>
                  <Col>
                     Click on
                     <Button>
                        <NavLink to='/signup'>Sign up</NavLink>
                     </Button>
                     create new accounts
                  </Col>
               </Row>
            </div>
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
