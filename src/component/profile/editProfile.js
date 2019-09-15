import React, { Fragment} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
//import profile_image from './coughing-emoji.png'

const EditProfile = (props) => {
    const { auth, profile } = props;
    console.log(auth);
    if (!auth.uid) { return <Redirect to='/signin' /> }
    return (
        <Fragment>
            <img src="/img/coughing-emoji.png" alt="" 
                style={{width: 200,
                    height: 200,
                    objectFit: 'cover',
                    maxWidth: '100%',
                    borderRadius: '50%'}}/>
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

export default connect(mapStateToProps)(EditProfile)