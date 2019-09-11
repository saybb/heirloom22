import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { signOut } from '../../store/Actions/userActions'


class Navigation extends Component {

  render() {
    const { auth, profile } = this.props;
    console.log(profile);
    return(
      <nav className="Navigation">
        <div className="container">
          <h1>Heirloom22 Title Here</h1>
          { !auth.uid ?
              <div>
                <ul className="right">
                  <li><NavLink to='/signup'>Sign up</NavLink></li>
                  <li><NavLink to='/signin'>Log in</NavLink></li>
                </ul>
              </div>
            :
            <div>
              <ul className="right">
                <li><NavLink to='/'>Hello, {!auth.displayName ? profile.firstName : auth.displayName}</NavLink></li>
                <li><Button onClick={this.props.signOut}>Log out</Button></li>
              </ul>
            </div>
          }
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {  
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)