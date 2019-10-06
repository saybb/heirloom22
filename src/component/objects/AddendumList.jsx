/** AddendumList grabs all the addendums from database
 *    that contains references to the parent document path
 * Component structure
 *     Artefact, People, or Event
 *                v
 *          AddendumList
 *                |
 *    +-----------+-----------+
 *    |                       |
 * Addendum              AddendumForm
 */

import React, {Component} from "react";
import {Button} from "antd";
// connect to backend
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {deleteObj} from "../../store/Actions/userActions";
import {ADDENDUMS} from "../../store/objectTypes";
// components
import Addendum from "./Addendum";
import AddendumForm from "./AddendumForm";

export class AddendumList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false
      };
   }

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

   render() {
      const {addendums} = this.props;
      console.log("List of addendums", addendums);
      return (
         <div>
            <h2>Addendums</h2>
            <Button onClick={this.showModal}> Add an addendum </Button>
            <AddendumForm
               visible={this.state.visible}
               onCancel={this.handleCancel}
            />
            <Addendum />
         </div>
      );
   }
}

const mapStateToProps = state => {
   const addendums = state.firestore.data.Addendums;
   return {
      addendums: addendums
   };
};

const mapDispatchToProps = dispatch => {
   return {
      deleteObj: (objType, docId) => dispatch(deleteObj(objType, docId))
   };
};

// Search the addendum that has a reference to the parent document
export default compose(
   connect(
      mapStateToProps,
      mapDispatchToProps
   ),
   firestoreConnect(props => [
      {
         collection: ADDENDUMS,
         where: ["Reference", "==", "Artefacts/vase_id"]
      }
   ])
)(AddendumList);
