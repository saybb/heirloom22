import React, { Fragment} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const UserProfile = (props) => {
    const { auth, profile } = props;
    if (!auth.uid) { return <Redirect to='/signin' /> }
    
    return (
        <Fragment>
            <img src= {profile.photoURL ? profile.photoURL : "https://firebasestorage.googleapis.com/v0/b/testing-e1ec1.appspot.com/o/No%20profile%20photo.png?alt=media&token=23fa70a3-c8a7-409d-bd73-0d38ed8772d6"}
                alt="" 
                style={{width: 200,
                    height: 200,
                    objectFit: 'cover',
                    maxWidth: '100%',
                    borderRadius: '50%',
                    verticalAlign: 'middle'}}/>
            <p> {auth.email}</p>
            <p>{profile.name}  {profile.lastName} </p>
            <p>{profile.email}</p>
            <p>{profile.location? profile.location : '(Please add your location)'}</p>
            <p>{profile.bio? profile.bio : '(Please edit your bio)'}</p>
        </Fragment>
    )
}

const mapStateToProps = (state) => {  
    return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
  }

export default connect(mapStateToProps)(UserProfile)