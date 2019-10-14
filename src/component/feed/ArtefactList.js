/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 */

import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Row } from 'antd';

// components
import ArtefactListElement from "./ArtefactListElement.js";
import './ArtefactList.css';
import ArtefactHandler from "../forms/ArtefactHandler.js";
import { ARTEFACTS } from "../../store/objectTypes";

class ArtefactList extends React.Component {
    
    render() {
        const { artefacts } = this.props;
        console.log(artefacts);
        if(!artefacts){
            return (
                <div className="container center">
                    <h2>Loading artefacts...</h2>
                </div>
            )
        }
        if(artefacts && !Object.keys(artefacts)){
            return (
                <div className="container center">
                    <h2>No artefact found.</h2>
                </div>
            )
        }
        return(
            <div className="artefact-list-wrapper">
                <div className="artefact-list-header">
                    <h2>Browsing your collection...</h2>
                    <ArtefactHandler type={"create"} />
                </div>
                <div className="artefact-list">
                    { artefacts && Object.entries(artefacts).map(([id, artefact]) => <ArtefactListElement key={id} reference={id} artefact={artefact}/>)}  
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      artefacts: state.firestore.data.Artefacts,
      auth: state.firebase.auth,
      // profile: state.firebase.profile,
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [{
        collection: ARTEFACTS,
    }])
)(ArtefactList)