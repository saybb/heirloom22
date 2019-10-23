/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 */

import React, {Fragment} from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Spin, Affix} from "antd";

// components
import ArtefactListElement from "./ArtefactListElement.js";
import "./ArtefactList.css";
import ArtefactHandler from "../forms/ArtefactHandler.js";
import {ARTEFACTS} from "../../store/objectTypes";

class ArtefactList extends React.Component {
   render() {
      const {artefacts} = this.props;

      const header = (
        <Affix>
            <div className="header">
               <p className="ant-page-header-heading-title">Browsing your collection</p>
               <ArtefactHandler type={"create"} />
            </div>
        </Affix>
      )

      // check if on loaded
      if (!artefacts) {
         return (
            <Fragment>
                {header}
                 <div className='container center'>
                    <Spin tip='Loading artefacts...' size='large' />
                </div>
            </Fragment>
         );
      }

      /*
        firebase returns an object with id as key, but null in value.
        To check if artefacts exist, see if null value.
      */
      if (artefacts && !Object.keys(artefacts)) {
         return (
            <Fragment>
                {header}
                <div className='container center'>
                    <h2>No artefacts found.</h2>
                </div>
            </Fragment>
         );
      }

      // artefacts is on loaded.
      return (
         <Fragment>
            {header}
            <div className='artefact-list-wrapper'>
               <div className='artefact-list'>
                  {artefacts &&
                     Object.entries(artefacts).map(([id, artefact]) => (
                        <ArtefactListElement
                           key={id}
                           reference={id}
                           artefact={artefact}
                        />
                     ))}
               </div>
            </div>
         </Fragment>
      );
   }
}

const mapStateToProps = state => {
   return {
      artefacts: state.firestore.data.Artefacts,
      auth: state.firebase.auth,
      profile: state.firebase.profile
   };
};

export default compose(
   connect(mapStateToProps),
   firestoreConnect(() => [
      {
         collection: ARTEFACTS
      }
   ])
)(ArtefactList);
