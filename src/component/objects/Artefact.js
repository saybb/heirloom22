/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

// components
import ItemLinks from './ItemLinks.js';
import "./Objects.css";

const Artefact = (props) => {
  const { artefact, auth } = props;

  // must be signed in to see this
  if (!auth.uid) return <Redirect to='/signin' /> 
  
  if (artefact) {
    return (
        <div className="object">
            <div className="object-image-container">
            <img src='https://bit.ly/324CaHY' alt={artefact.title} />
            </div>
            <div className="object-content">
                <h2>{artefact.name}</h2>
                <p>{artefact.details}</p>
                {/* ItemLinks will render links as items with names and relation descriptors */}
                <ItemLinks title="Related People" items={artefact.people_links}/>
                <ItemLinks title="Related Events" items={artefact.event_links}/>
            </div>
        </div>
    )
  } else {
    return (
      <div className="object-content">
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
