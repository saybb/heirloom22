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
            {/* <div className="object-image-container">
            <img src='https://bit.ly/324CaHY' alt={artefact.title} />
            </div> */}
            <div className="object-content">
                <h2>{artefact.title}</h2>
                <p>{artefact.description}</p>
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
    const artefact = state.firestore.data.artefacts;
    if (state.firestore.data.artefacts){
        
        return {
            artefact: artefact[id],
            auth: state.firebase.auth,
        }
    }else{
        return {
            artefact: null,
            auth: state.firebase.auth,
        }
    }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) =>[{
    collection: 'artefacts', 
    doc: props.match.params.id,
  }])
)(Artefact)





