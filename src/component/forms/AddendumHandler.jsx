import React, {Component} from "react";
import {Modal, Button, Icon} from "antd";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

import {createObj, editObj} from "../../store/Actions/userActions";
import {ADDENDUMS} from "../../store/objectTypes";
import AddendumForm from "./AddendumForm.jsx";;

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

      this.setState({visible: false});
   };

   render() {
      return (
         <React.Fragment>
            {/* Choose button based on edit vs create */}
            { this.state.type === "create"
               ?  <Button
                     type='primary'
                     shape='circle'
                     icon={"file-add"}
                     ghost
                     onClick={this.showModal}
                     size='small'
                  />
               :  <Button
                     size="small"
                     onClick={this.showModal}
                  >
                     <Icon type="form"/>{"Edit"}
                  </Button>
            }
            

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
