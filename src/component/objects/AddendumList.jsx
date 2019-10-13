/** AddendumList grabs all the addendums from database
 *    that contains references to the parent document path
 * Component structure
 *             Artefact
 *                v
 *          AddendumList
 *                |
 *    +-----------+-----------+
 *    |                       |
 * Addendum              AddendumForm
 */

import React, {Component} from "react";
// connect to backend
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {deleteObj} from "../../store/Actions/userActions";
import {ADDENDUMS} from "../../store/objectTypes";
// components
import Addendum from "./Addendum";
import AddendumHandler from "../forms/AddendumHandler";

import "./AddendumList.css"

// helper function
function createPath(id) {
   return "Artefacts/" + id;
}

/**
 * Class component.
 * Props:
 *   - id: the id of the artefact
 */
export class AddendumList extends Component {
   state = {
      path: createPath(this.props.id)
   };

   handleDelete = id => {
      this.props.deleteObj(ADDENDUMS, id);
   };

   // input: a list of addendum documents
   // output: a html list of Addendums
   generateList(list) {
      return list.map(element => (
         <li key={element[0]}>
            <Addendum
               id={element[0]}
               document={element[1]}
               delete={this.handleDelete}
            />
         </li>
      ));
   }

   // input: {doc_id:doc, ... }
   // output: [ [document_id, document], [document_id, document], ...]
   getAddendums(addendums) {
      const addendumsList = Object.keys(addendums).map(key => [
         key,
         addendums[key]
      ]);
      // filter out the addendums that contains document reference to the parent object
      /* You can simply use Array.filter() instead.
      let filtered_addendumsList = [];
      for (const addendum of addendumsList) {
         // Weird thing even if you delete something, the document id still exits
         if (addendum[1] && addendum[1].reference.path === this.state.path) {
            filtered_addendumsList.push(addendum);
         }
      }*/
      return addendumsList.filter(
         addendum =>
            addendum[1] && addendum[1].reference.path === this.state.path
      );
   }

   render() {
      // grab the addendums object
      const {addendums} = this.props;
      //console.log(addendums);
      let filtered_addendumsList = [];
      // check if we received the addendums
      if (addendums) {
         filtered_addendumsList = this.getAddendums(addendums);
         // console.log("filtered_addendumsList", filtered_addendumsList);
      }
      // check if there are any addendums
      return (
         <div>
            <h2>Addendums</h2>
            <AddendumHandler
               artefact_id={this.props.id}
               type='create'
            />
            {filtered_addendumsList.length === 0 ? (
               <p>Press add an addendum button to create addendums</p>
            ) : (
               <ul>{this.generateList(filtered_addendumsList)}</ul>
            )}
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
         // where: ["reference", "==", props.ref],
         orderBy: ["date_created"]
      }
   ])
)(AddendumList);
