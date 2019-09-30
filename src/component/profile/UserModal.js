/**
 * UserModal :: ReactJS Component
 * Button and modal to access user-related features.
 */

import React from 'react'
import { Modal, Button } from 'antd';
import { connect } from 'react-redux'
import { updateUserProfile } from '../../store/Actions/authActions'
import UserProfile from '../profile/userProfile'
import EditProfile from '../profile/editProfile'

class UserModal extends React.Component {
    state = {
        //ModalText: 'Content of the modal',
        editMode: false,
        visible: false,
        confirmLoading: false,
        name: '',
        lastName: '',
        location: '',
        bio: '',
        imageUrl: '',
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

    handleSubmit = (e) => {
        console.log('updating user profile');
        this.setState({ 
            loading: true,  
            editMode: false
        });
        
        console.log('update: ',this.state.name, this.state.lastName, this.state.location, this.state.bio);
        this.props.updateUserProfile(this.state);
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleBack = () => {
        this.setState({
            visible: false,
            editMode: false
        });
    }

    handleCancel = () => {
        this.setState({
            editMode: false,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    render() {
        const { visible, confirmLoading } = this.state;
        const { profile, auth } = this.props;
        return(
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Hello, {!auth.displayName ? profile.name : auth.displayName}
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
                        <EditProfile handleChange={this.handleChange} />
                    }
                </Modal>
            </div>
        );

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
        updateUserProfile: (info) => dispatch(updateUserProfile(info))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserModal)