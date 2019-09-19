/**
 * Navigation :: ReactJS Component
 * Renders the navigation bar for the site.
 * Provides global access to Top-Level links, and allows sign-in and sign-out.
 */

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd';
import { signOut } from '../../store/Actions/userActions'

import UserModal from '../profile/UserModal.js';

class Navigation extends Component {

    render() {
        const { auth } = this.props;

        return(
            <nav className="Navigation">
                <div className="container">
                    <h1>Heirloom22 Title Here</h1>
                    { !auth.uid ?
                        <ul className="right">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/feed'>List View</NavLink></li>
                            <li><NavLink to='/signup'>Sign up</NavLink></li>
                            <li><NavLink to='/signin'>Log in</NavLink></li>
                            <li><NavLink to='/view/artefact/family_crest_monument_idnpm '>Sample Artefact View</NavLink></li>
                            <li><NavLink to='/view/event'>Sample Event View</NavLink></li>
                        </ul>
                        :
                        <Fragment>
                            <UserModal />
                            <Button type="danger" onClick={this.props.signOut}>Log out</Button>
                        </Fragment>
                    }
                </div>
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