import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal, Button } from 'antd';
import { signOut } from '../../store/Actions/userActions'
import UserProfile from '../profile/userProfile'
import EditProfile from '../profile/editProfile'

class Navigation extends Component {

  state = {
    //ModalText: 'Content of the modal',
    editMode: false,
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleEditMode = () => {
    this.setState({
      editMode: true,
    });
  }

  handleSubmit = () => {
    console.log('updating user profile');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleBack = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      editMode: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { auth, profile } = this.props;

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
                    title="Profile"
                    visible={visible}
                    onOk={this.handleSubmit}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleBack}
                    footer={!this.state.editMode ? 
                      [
                        <Button key="close" onClick={this.handleBack}>
                          Back
                        </Button>,
                        <Button key="edit" type="primary" onClick={this.handleEditMode}>
                          Edit Profile
                        </Button>,
                      ]
                      :
                      [
                        <Button key="cancle" onClick={this.handleCancel}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleSubmit}>
                          Submit
                        </Button>,
                      ]
                    }
                  >
                    {!this.state.editMode ? 
                      <UserProfile/>
                      :
                      <EditProfile/>
                    }
                    
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