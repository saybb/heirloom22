import React, { Fragment} from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'antd';

const EditProfile = ({handleChange, state}) => {
    return (
      <Fragment>
        <Form >
        <Form.Item label="firstName" >
            <Input id="name" placeholder="first name" onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="lastName" >
            <Input id="lastName" placeholder="last name" onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="location" >
            <Input id="location" placeholder="where you are?" onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="bio" >
            <Input id="bio" placeholder="tell them about yourself" onChange={handleChange}/>
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