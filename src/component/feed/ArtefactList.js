/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 */

import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'

// components
import ArtefactListElement from "./ArtefactListElement.js";
import './ArtefactList.css';

class ArtefactList extends React.Component {
    
    render() {
        const { artefacts } = this.props;

        if(!isLoaded(artefacts)){
            return (
                <div className="container center">
                    <h2>Loading artefacts...</h2>
                </div>
            )
        }
        if(isEmpty(artefacts)){
            return (
                <div className="container center">
                    <h2>Nothing found.</h2>
                </div>
            )
        }
        return(
            <div className="ArtefactList">
                <h2>Browsing your collection...</h2>
                { artefacts && Object.entries(artefacts).map(([id, artefact]) => <ArtefactListElement key={id} reference={id} artefact={artefact}/>)}  
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    //const artefacts = state.firestore.data.artefacts;
    //console.log(artefacts)
    return {
      artefacts: state.firestore.data.Artefacts,
      auth: state.firebase.auth
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [{
        collection: 'Artefacts',
        // where: [
        //     'created_by', '==', (props.profile.name? props.profile.name : '')
        // ]
    }])
)(ArtefactList)