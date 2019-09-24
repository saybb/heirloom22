/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 */

import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


// components
import ArtefactListElement from "./ArtefactListElement.js";
import './ArtefactList.css';
import { fetechArtefacts } from "../../store/Actions/artefactActions";



class ArtefactList extends React.Component {
    componentDidMount() {
        this.props.fetechArtefacts();
     }

    render() {
        const { auth, artefacts } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        console.log(typeof artefacts.artefacts);
        
        if(artefacts.isLoading){
            return (
                <div className="ArtefactList">
                    <div className="container center">
                        <h2>Loading artefact list...</h2>
                    </div>
                </div> 
            )
        }
        // ERROR occurs
        if (artefacts.errMess) {
            return (
                <div className="ArtefactList">
                    <div className="container center">
                        <h2>{artefacts.errMess}</h2>
                    </div>
                </div>
            )
        }

        return(
            <div className="ArtefactList">
            <h2>Browsing your collection...</h2>
            { Object.entries(artefacts.artefacts).map(([id, artefact]) => <ArtefactListElement key={id} reference={id} artefact={artefact}/>)}  
        </div> 
        )

    }
}

const mapStateToProps = (state) => {
    return {
      artefacts: state.artefacts,
      auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetechArtefacts: () => {dispatch(fetechArtefacts())},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArtefactList)