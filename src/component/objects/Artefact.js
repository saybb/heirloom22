/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 */

import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded  } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

// components
import ItemLinks from './ItemLinks.js';
import "./Objects.css";

const Artefact = (props) => {
  const { artefact, auth } = props;
  const id = props.match.params.id;

  // must be signed in to see this
  if (!auth.uid) return <Redirect to='/signin' /> 

  if (!isLoaded(artefact)){
    return (
      <div className="object-content">
        <h2>Artefact is loading...</h2>
      </div>
    )
  }
  
  if (artefact) {
    if(artefact[id] == null){
      return (
        <div className="object-content">
          <h2>Artefact is NOT FOUND</h2>
        </div>
      )
    }
    return (
        <div className="object">
            {/* <div className="object-image-container">
            <img src='https://bit.ly/324CaHY' alt={artefact.title} />
            </div> */}
            <div className="object-content">
                <h2>{artefact[id].title}</h2>
                <p>{artefact[id].description}</p>
                {/* ItemLinks will render links as items with names and relation descriptors */}
                <ItemLinks title="Related People" items={artefact[id].people_links}/>
                <ItemLinks title="Related Events" items={artefact[id].event_links}/>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    const artefact = state.firestore.data.artefacts;   
      return {
          artefact: artefact,
          auth: state.firebase.auth,
      }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) =>[{
    collection: 'artefacts', 
    doc: props.match.params.id,
  }])
)(Artefact)





