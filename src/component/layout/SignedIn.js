import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/ActionCreators'
import { Button } from 'antd';


const SignedIn = (props) => {
  return (
    <div>
      <Button type="signin"><NavLink to='/signin'>Log In</NavLink></Button>
      <Button type="signup"><NavLink to='/signup'>Sign Up</NavLink></Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedIn)