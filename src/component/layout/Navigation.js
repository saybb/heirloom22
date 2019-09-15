import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal, Button } from 'antd';
import { signOut } from '../../store/Actions/userActions'
import UserProfile from '../profile/userProfile'



class Navigation extends Component {

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { auth, profile } = this.props;
    console.log(profile);

    return(
      <nav className="Navigation">
        <div className="container">
          <h1>Heirloom22 Title Here</h1>
          { !auth.uid ?
              <div>
                <ul className="right">
                  <li><NavLink to='/signup'>Sign up</NavLink></li>
                  <li><NavLink to='/signin'>Log in</NavLink></li>
                </ul>
              </div>
            :
            <Fragment>
                <div>
                  <Button type="primary" onClick={this.showModal}>
                    Hello, {!auth.displayName ? profile.firstName : auth.displayName}
                  </Button>
                  <Modal
                    title="Edit your profile"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        Return
                      </Button>,
                      <Button key="submit" type="primary" onClick={this.handleOk}>
                        Submit
                      </Button>,
                    ]}
                  >
                    <UserProfile/>
                  </Modal>
                </div>
                <div>
                  <Button type="danger" onClick={this.props.signOut}>Log out</Button>
                </div>
              </Fragment>
          }
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {  
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)