/**
 * Navigation :: ReactJS Component
 * Renders the navigation bar for the site.
 * Provides sitewide navigation, and access to account features.
 */

import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Menu, Button, Icon} from "antd";
import {signOut} from "../../store/Actions/authActions";
import logo from "../../heirloom22_logo.svg";
import UserModal from "../profile/UserModal.js";
import "./Navigation.css";

class Navigation extends React.Component {
   render() {
      return (
         <nav className='nav-bar'>
            <this.MainMenu />
            <this.UserMenu />
         </nav>
      );
   }

   // menu for site navigation
   MainMenu = () => {
      const {auth} = this.props;

      // use auth.uid to check if we can show the signup page
      if (auth.uid) {
         return (
            <Menu className='menu-main' mode='horizontal'>
               <Menu.Item key='logo'>
                  <NavLink to='/'>
                     <img className='nav-logo' src={logo} alt='logo' />
                  </NavLink>
               </Menu.Item>
               <Menu.Item key='home'>
                  <NavLink to='/'>Home</NavLink>
               </Menu.Item>
               <Menu.Item key='list'>
                  <NavLink to='/feed'>List View</NavLink>
               </Menu.Item>
               <Menu.Item key='artefact'>
                  <NavLink to='/view/artefacts/family_crest_monument_id'>
                     Sample Artefact View
                  </NavLink>
               </Menu.Item>
               <Menu.Item key='event'>
                  <NavLink to='/view/events/making_crest_id'>
                     Sample Event View
                  </NavLink>
               </Menu.Item>
               <Menu.Item key='person'>
                  <NavLink to='/view/people/john_gilbert_id'>
                     Sample Person View
                  </NavLink>
               </Menu.Item>
            </Menu>
         );
      } else {
         return (
            <Menu className='menu-main' mode='horizontal'>
               <Menu.Item key='logo'>
                  <NavLink to='/'>
                     <img className='nav-logo' src={logo} alt='logo' />
                  </NavLink>
               </Menu.Item>
               <Menu.Item key='home'>
                  <NavLink to='/'>Home</NavLink>
               </Menu.Item>
            </Menu>
         );
      }
   };

   // menu for account-related functions
   UserMenu = () => {
      const {auth, signOut} = this.props;

      if (auth.uid) {
         return (
            <Menu className='menu-user' mode='horizontal'>
               <Menu.Item key='profile'>
                  <UserModal />
               </Menu.Item>
               <Menu.Item key='signup'>
                  <NavLink to='/signup'>Sign up</NavLink>
               </Menu.Item>
               <Menu.Item key='logout'>
                  <Button type='link' onClick={signOut}>
                     <Icon type='logout' style={{color: "red"}} />
                  </Button>
               </Menu.Item>
            </Menu>
         );
      } else {
         return (
            <Menu className='menu-user' mode='horizontal'>
               <Menu.Item key='login'>
                  <NavLink to='/signin'>Log in</NavLink>
               </Menu.Item>
            </Menu>
         );
      }
   };
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
