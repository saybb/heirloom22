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
import AddendumForm from "../forms/AddendumForm";

export class AddendumList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         path: this.createPath(props.id)
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

   createPath(id) {
      return "Artefacts/" + id;
   }

   // input: a list of addendum documents
   // output: a html list of Addendums
   generateList(list) {
      return list.map(element => (
         <li key={element[0]}>
            <Addendum id={element[0]} document={element[1]} />
         </li>
      ));
   }

   render() {
      // grab the addendums object
      const {addendums} = this.props;
      // check if we received the addendums
      if (!addendums) {
         return <div>Loading</div>;
      }
      let filtered_addendumsList = this.getAddendums(addendums);
      console.log("filtered_addendumsList", filtered_addendumsList);
      return (
         <div>
            <h2>Addendums</h2>
            <Button onClick={this.showModal}> Add an addendum </Button>
            <AddendumForm
               visible={this.state.visible}
               onCancel={this.handleCancel}
            />
            <ul>{this.generateList(filtered_addendumsList)}</ul>
         </div>
      );
   }

   // input: {doc_id:doc, ... }
   // output: [ [document_id, document], [document_id, document], ...]
   getAddendums(addendums) {
      const addendumsList = Object.keys(addendums).map(key => [
         key,
         addendums[key]
      ]);
      // console.log("addendumsList", addendumsList);
      // filter out the addendums that contains document reference to the parent object
      let filtered_addendumsList = addendumsList.filter(
         element => element[1].reference.path === this.state.path
      );
      return filtered_addendumsList;
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
         orderBy: ["date_created"]
      }
   ])
)(AddendumList);