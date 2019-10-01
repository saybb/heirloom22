import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/Actions/authActions'
import { Button, Form } from 'semantic-ui-react'


class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, name, lastName } = this.state;
        const signup = {
            email: email,
            password: password,
            name: name,
            lastName: lastName
        }

        this.props.signUp(signup);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>First Name</label>
                    <input type="text" placeholder='First Name' id='name' onChange={this.handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>Last Name</label>
                    <input type="text" placeholder='Last Name' id='lastName' onChange={this.handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>Email</label>
                    <input type="email" placeholder='email' id='email' onChange={this.handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>Password</label>
                    <input type="password" placeholder='password' id='password' onChange={this.handleChange} />
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.user.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
