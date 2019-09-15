import React, { Fragment} from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'antd';

const EditProfile = (props) => {

    return (
      <Fragment>
        <Form >
        <Form.Item label="firstName" {...'inline'}>
            <Input placeholder="first name" />
          </Form.Item>
          <Form.Item label="lastName" {...'inline'}>
            <Input placeholder="last name" />
          </Form.Item>
          <Form.Item label="location" >
            <Input placeholder="where you are?" />
          </Form.Item>
          <Form.Item label="bio" >
            <Input placeholder="tell them about yourself" />
          </Form.Item>
        </Form>
      </Fragment>
    );
}


const mapStateToProps = (state) => {  
    return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
  }

export default connect(mapStateToProps)(EditProfile)