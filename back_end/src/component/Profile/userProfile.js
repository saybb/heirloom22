import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const UserProfile = (props) => {
    const { auth, profile } = props;
    console.log(auth);
    if (!auth.uid) { return <Redirect to='/signin' /> }
    return (
        <div className="userProfile">
            <div className="container">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <ul>
                    <li>{profile.email}</li>
                    <li>{profile.location? profile.location : '(Please add your location)'}</li>
                    <li>{profile.bio? profile.bio : '(Please edit your bio)'}</li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {  
    return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
  }

export default connect(mapStateToProps)(UserProfile)