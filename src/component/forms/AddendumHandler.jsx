import React, {Component} from "react";
import {Modal, Button} from "antd";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

import {createObj, editObj} from "../../store/Actions/userActions";
import {ADDENDUMS} from "../../store/objectTypes";
import AddendumForm from "./AddendumForm.jsx";

export class AddendumHandler extends Component {
   state = {
      visible: false,
      type: this.props.type,
      title:
         this.props.type === "create" ? "Create an Addendum" : "Edit Addendum",
      docId: this.props.docId ? this.props.docId : null
   };

   showModal = () => {
      this.setState({
         visible: true
      });
   };

   handleCancel = () => {
      this.setState({
         visible: false
      });
   };

   handleSubmit = addendum => {
      // insert reference
      addendum.reference = this.props.firestore.doc(
         "Artefacts/" + this.props.artefact_id
      );

      console.log(addendum);
      console.log(this.props.docId)
      if (this.state.type === "create") {
         this.props.createObj(ADDENDUMS, addendum);
      } else {
         this.props.editObj(ADDENDUMS, this.props.docId, addendum);
      }

      setTimeout(() => {
         this.setState({visible: false});
      }, 1000);
   };

   render() {
      return (
         <React.Fragment>
            <Button size={this.props.size ? this.props.size : "default"} onClick={this.showModal}> {this.state.title} </Button>
            <Modal
               visible={this.state.visible}
               onCancel={this.handleCancel}
               title={this.state.title}
               footer={[
                  <Button
                     key='cancel'
                     type='default'
                     onClick={this.handleCancel}
                  >
                     Cancel
                  </Button>
               ]}
            >
               <AddendumForm handleSubmit={this.handleSubmit} />
            </Modal>
         </React.Fragment>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      createObj: (objType, addendum) => dispatch(createObj(objType, addendum)),
      editObj: (objType, id, addendum) =>
         dispatch(editObj(objType, id, addendum))
   };
};

export default compose(
   connect(
      null,
      mapDispatchToProps
   ),
   firestoreConnect()
)(AddendumHandler);
