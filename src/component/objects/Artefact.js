import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

// components
import "./Artefact.css";
import {Divider} from "antd";

const Artefact = (props) => {
  const { artefact, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (artefact) {
    return (
        <div className="Artefact">
            <div className="ArtefactContent">
                <h2>{artefact.title}</h2>
                <p>{artefact.description}</p>
                {/* <People people={artefact.people_links}/>
                <Events events={artefact.event_links}/> */}
            </div>
            <div className="ArtefactImageContainer">
                <img src='https://bit.ly/324CaHY' alt={artefact.title} />
            </div>
        </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading artefact...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const artefacts = state.firestore.data.artefacts;
  const artefact = artefacts ? artefacts[id] : null
  return {
    artefact: artefact,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'artefacts'
  }])
)(Artefact)