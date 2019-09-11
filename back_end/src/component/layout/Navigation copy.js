import React from 'react'
import { connect } from 'react-redux'
import SignedIn from '../layout/SignedIn'
import SignedOut from '../layout/SignedOut'

const Navbar = (props) => {

  const display = props.auth.isAuthenticated ? <SignedOut props/> : <SignedOut/>

  return (
    <nav className="Navigation">
      <div className="container">
        <h1>Heirloom22 Title Here</h1>
        {display}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Navbar)