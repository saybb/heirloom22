import React, { Fragment, useState} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Spin, Descriptions } from 'antd';

const UserProfile = (props) => {
    const [loaded, setLoaded] = useState(false);
    const { auth, profile } = props;
    const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
    if (!auth.uid) { return <Redirect to='/signin' /> }

    return (
        <Fragment>
            <div style={{textAlign: "center"}}>
            {loaded ? null :
            <Spin indicator={loadingIcon} />
            }
                <img src= {profile.photoURL ? profile.photoURL : "https://firebasestorage.googleapis.com/v0/b/testing-e1ec1.appspot.com/o/No%20profile%20photo.png?alt=media&token=23fa70a3-c8a7-409d-bd73-0d38ed8772d6"}
                    alt="" 
                    style={{width: 200,
                        height: 200,
                        objectFit: 'cover',
                        maxWidth: '100%',
                        borderRadius: '50%',
                        verticalAlign: 'middle'}}
                        onLoad={() => setLoaded(true)}/>
            </div>
              <Descriptions title="User Info" column={1}>
                <Descriptions.Item label="UserName">{profile.name}  {profile.lastName}</Descriptions.Item>
                <Descriptions.Item label="Email">{auth.email}</Descriptions.Item>
                <Descriptions.Item label="Live">{profile.location? profile.location : '(Please add your location)'}</Descriptions.Item>
                <Descriptions.Item label="Bio">
                    {profile.bio? profile.bio : '(Please edit your bio)'}
                </Descriptions.Item>
            </Descriptions>

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