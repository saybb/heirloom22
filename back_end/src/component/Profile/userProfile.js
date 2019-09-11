import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// something changed

const UserProfile = (props) => {
    const { profile } = props;
    console.log(profile);
    if (profile.isEmpty) { return <Redirect to='/signin' /> }
    return (
        <div className="userProfile">
            <div className="container">
                <h2>{profile.firstName + ' ' + profile.lastName}</h2>
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
      profile: state.firebase.profile 
    }
  }

export default connect(mapStateToProps)(UserProfile)