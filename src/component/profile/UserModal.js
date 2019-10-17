/**
 * UserModal :: ReactJS Component
 * Button and modal to access user-related features.
 */

import React from "react";
import {Modal, Button} from "antd";
import {connect} from "react-redux";
import {updateUserProfile} from "../../store/Actions/authActions";
import {uploadFile} from "../../store/Actions/userActions";
import UserProfile from "../profile/userProfile";
import EditProfile from "../profile/editProfile";

import {storageRef} from "../../firebase/config";

class UserModal extends React.Component {
   state = {
      //ModalText: 'Content of the modal',
      editMode: false,
      visible: false,
      confirmLoading: false,
      name: "",
      lastName: "",
      location: "",
      bio: "",
      photoURL: null,
      file: null,
   };

   showModal = () => {
      this.setState({
         visible: true
      });
   };

   handleEditMode = () => {
      this.setState({
         editMode: true
      });
   };


   handleSubmit = async (e) => {
        if(this.state.file){
            //await this.props.uploadFile("image/" + this.props.auth.uid + "/" + this.state.file.name, this.state.file);
            let snapshot = await storageRef.child("image/" + this.props.auth.uid + "/" + this.state.file.name).put(this.state.file);
            this.setState({
                photoURL: await snapshot.ref.getDownloadURL(),
            })

        }
        this.props.updateUserProfile(this.state);
        this.setState({loading: false, visible: false, editMode: false});
   };

   handleBack = () => {
      this.setState({
         visible: false,
         editMode: false
      });
   };

   handleCancel = () => {
      this.setState({
         editMode: false
      });
   };

   handleChange = e => {
      this.setState({
         [e.target.id]: e.target.value
      });
   };

   handleFile = file => {
       this.setState({
           file: file
       })
   }

   render() {
      const {visible, confirmLoading} = this.state;
      const {profile, auth} = this.props;

      return (
         <div>
            <Button type='primary' onClick={this.showModal} icon="user">
                {profile.name ? profile.name : auth.displayName}
            </Button>
            <Modal
               title='Profile'
               visible={visible}
               onOk={this.handleSubmit}
               confirmLoading={confirmLoading}
               onCancel={this.handleBack}
               footer={
                  !this.state.editMode
                     ? [
                          <Button key='close' onClick={this.handleBack}>
                             Back
                          </Button>,
                          <Button
                             key='edit'
                             type='primary'
                             onClick={this.handleEditMode}
                          >
                             Edit Profile
                          </Button>
                       ]
                     : [
                          <Button key='cancle' onClick={this.handleCancel}>
                             Return
                          </Button>,
                          <Button
                             key='submit'
                             type='primary'
                             onClick={this.handleSubmit}
                          >
                             Submit
                          </Button>
                       ]
               }
            >
               {!this.state.editMode ? (
                  <UserProfile />
               ) : (
                  <EditProfile handleChange={this.handleChange} handleFile={this.handleFile}/>
               )}
            </Modal>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      url: state.objects.downloadURL
   };
};

const mapDispatchToProps = dispatch => {
   return {
      updateUserProfile: info => dispatch(updateUserProfile(info)),
      uploadFile: (path, file) => dispatch(uploadFile(path, file))
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(UserModal);
