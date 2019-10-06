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
// connect to backend
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {ADDENDUMS} from "../../store/objectTypes";
// components
import Addendum from "./Addendum";
import {deleteObj} from "../../store/Actions/userActions";

export class AddendumList extends Component {
   render() {
      const {addendums} = this.props;
      console.log(addendums);
      return (
         <div>
            <h2>Addendums</h2>
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
