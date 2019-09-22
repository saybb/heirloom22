/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 */

import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

// components
import ArtefactListElement from "./ArtefactListElement.js";
import './ArtefactList.css';

class ArtefactList extends React.Component {
    
    render() {
        const { artefacts } = this.props;
        if(artefacts){
            return(
                <div className="ArtefactList">
                    <h2>Browsing your collection...</h2>
                    { artefacts && Object.values(artefacts).map(artefact => <ArtefactListElement artefact={artefact}/>)}  
                </div> 
            );
        } else {
            return (
                <div className="container center">
                    <p>Loading artefact...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const artefacts = state.firestore.data.artefacts;
    return {
      artefacts: artefacts,
      auth: state.firebase.auth
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'artefacts'
    }])
)(ArtefactList)