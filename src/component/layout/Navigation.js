/**
 * Navigation :: ReactJS Component
 * Renders the navigation bar for the site.
 * Provides global access to Top-Level links, and allows sign-in and sign-out.
 */

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd';
import { signOut } from '../../store/Actions/userActions'

import UserModal from '../profile/UserModal.js';

class Navigation extends React.Component {

    render() {
        const { auth } = this.props;

        
        return(
            <nav className="Navigation">
                { !auth.uid ?
                    <ul>
                        <li><NavLink to='/signup'>Sign up</NavLink></li>
                        <li><NavLink to='/signin'>Log in</NavLink></li>
                    </ul>
                    :
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/feed'>List View</NavLink></li>
                        <li><NavLink to='/view/artefact/family_crest_monument_idnpm '>Sample Artefact View</NavLink></li>
                        <li><NavLink to='/view/event'>Sample Event View</NavLink></li>
                        <li><NavLink to='/view/person'>Sample Person View</NavLink></li>
                        <li><UserModal /></li>
                        <li><Button type="danger" onClick={this.props.signOut}>Log out</Button></li>
                    </ul>
                }
            </nav>
      )
    }
}

const mapStateToProps = (state) => {  
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)