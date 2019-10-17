/**
 * Navigation :: ReactJS Component
 * Renders the navigation bar for the site.
 * Provides sitewide navigation, and access to account features.
 */

import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import {Button} from "antd";
import {signOut} from "../../store/Actions/authActions";
import logo from "../../heirloom22_logo.svg";
import UserModal from "../profile/UserModal.js";
import "./Navigation.css";

// menu for site navigation
// returns an unordered list of links
const WithoutRouterMainMenu = props => {
   const {auth, location} = props;
   let {className} = props;
   // check which page we are on
   let current_position = location.pathname;
   const Gallery = "/feed";
   const Home = "/";
   // dynamic style
   let gallery_style = {};
   let home_style = {};
   const gallery_style_active = {
      backgroundColor: "white",
      color: " #096dd9",
      fontWeight: "bold"
   };

   const home_style_active = {
      backgroundColor: "aliceblue",
      color: " #096dd9",
      fontWeight: "bold"
   };

   if (current_position === Gallery) {
      gallery_style = gallery_style_active;
   }
   if (current_position === Home) {
      home_style = home_style_active;
   }

   // default class name
   if (!className) className = "main-menu";

   // use auth.uid to check if we can show the signup page
   if (auth.uid) {
      return (
         <ul className={className}>
            <li key='logo' className='logo'>
               <NavLink to='/'>
                  <img src={logo} alt='logo' />
               </NavLink>
            </li>
            <li key='home' style={home_style}>
               <NavLink to='/'>Home</NavLink>
            </li>
            <li key='list' style={gallery_style} id='gallery'>
               <NavLink to='/feed'>Gallery</NavLink>
            </li>
         </ul>
      );
   } else {
      return (
         <ul className={className}>
            <li key='logo'>
               <NavLink to='/'>
                  <img className='nav-logo' src={logo} alt='logo' />
               </NavLink>
            </li>
            <li key='home'>
               <NavLink to='/'>Home</NavLink>
            </li>
         </ul>
      );
   }
};
const MainMenu = withRouter(WithoutRouterMainMenu);

const HamburgerButton = props => {
   let {onClick, className} = props;
   // default class name
   if (!className) className = "hamburger-button";
   return (
      <Button type='primary' className={className} onClick={onClick}>
         <p id='button-text'>Account</p>
      </Button>
   );
};

// menu for account-related functions
// return an unordered list of user actions
class UserMenu extends React.Component {
   // active means button has been pressed
   // then show the user menu
   state = {active: false};

   clickHandler = () => {
      this.setState({active: !this.state.active});
      console.log("clicked", this.state.active);
   };

   render() {
      let {auth, signOutHandler, className} = this.props; // default class name
      if (!className) className = "user-menu";
      // change the css class name depending if it is active
      if (this.state.active) {
         className += " active";
      }

      if (auth.uid) {
         return (
            <React.Fragment>
               <HamburgerButton
                  className='toggle-button'
                  onClick={this.clickHandler}
               />
               <ul className={className}>
                  <li key='profile'>
                     <UserModal />
                  </li>
                  <li key='signup'>
                     <NavLink to='/signup'>Sign up</NavLink>
                  </li>
                  <li key='logout'>
                     <NavLink to='/' onClick={signOutHandler}>
                        Logout
                     </NavLink>
                  </li>
               </ul>
            </React.Fragment>
         );
      } else {
         return (
            <ul className={className}>
               <li key='login'>
                  <NavLink to='/signin'>Log in</NavLink>
               </li>
            </ul>
         );
      }
   }
}

/**
 * A naviation bar
 * split into two parts that whose behavior is deteremed by authenticaion
 *
 * Condition: User not signed in
 * 1. Main Menu:
 *    - Logo
 *    - Home
 * 2. User Menu:
 *    - Login
 *
 * Condition: User signed in
 * 1. <MainMenu/>:
 *    - Logo
 *    - Home
 *    - Gallery
 *
 * 2. <UserMenu/>:
 *    - Username
 *    - <User Modal/>
 *    - Signup
 *    - Logout
 * @class Navigation
 * @extends {React.Component}
 */
class Navigation extends React.Component {
   render() {
      const {auth, signOut} = this.props;

      return (
         <div className='nav-bar'>
            <MainMenu auth={this.props.auth} className='main-menu' />

            <UserMenu
               auth={auth}
               signOutHandler={signOut}
               className='user-menu'
            />
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      auth: state.firebase.auth
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
)(Navigation);
