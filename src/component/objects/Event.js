/* * *
 * Event :: ReactJS Component
 * Page for the display of an Event.
 * The event should be passed to this component as the prop "event".
 * Created By: Lawson Wang-Wills
 */

import React from 'react';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded  } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


// const event = {
//     name: "Making the family crest",
//     date: "01/01/1980",
//     details: "This is when the family crest was made.",
//     date_created: "29/05/2000",
//     crated_by: "amanda",
//     artefacts_links: [
//         {
//             name: "Coat of arms of the Gilbert Monument",
//             relation: "created during",
//             reference: "Artefacts/family_crest_monument_id"
//         },
//         {
//             name: "family crest drawing",
//             relation: "created during",
//             reference: "Artefacts/family_crest_drawing_id"
//         },
//         {
//             name: "Recording of grandpa John making a crestt",
//             relation: "recorded during",
//             reference: "Artefacts/making_crest_id"
//         },
//     ]
// }

const Event = (props) => {

    const { event, auth } = props;
    const id = props.match.params.id;
    
    // must be signed in to see this
    if (!auth.uid) return <Redirect to='/signin' /> 

    if (!isLoaded(event)){
        return (
          <div className="object-content">
            <h2>Event is loading...</h2>
          </div>
        )
      }

    if (event) {
        if(event[id] == null){
          return (
            <div className="object-content">
              <h2>Event is NOT FOUND</h2>
            </div>
          )
        }

        return(
            <div className="object-content">
                <h2>{event[id].name}</h2>
                <p>Occurred on: put date here</p>
                <p>{event[id].details}</p>
                <ItemLinks title="Related Artefacts" items={event[id].artefacts_links}/>
            </div>
        );
    }
} 



const mapStateToProps = (state) => {
    const event = state.firestore.data.Events;
    return {
        event: event,
        auth: state.firebase.auth,
    }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) =>[{
    collection: 'Events', 
    doc: props.match.params.id,
  }])
)(Event)