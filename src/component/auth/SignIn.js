import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/Actions/userActions'
import { Redirect } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    const { /*authError,*/ auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
        <Form onSubmit={this.handleSubmit}>


          <Form.Field>
            <label>Email</label>
            <input type="email" placeholder='email' id='email' onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='password' id='password' onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit'>Log In</Button>

        </Form>




    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.user.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
