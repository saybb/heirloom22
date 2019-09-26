/* * *
 * Event :: ReactJS Component
 * Page for the display of an Event.
 */

import React from 'react';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty, isLoaded  } from 'react-redux-firebase'
import { compose } from 'redux'

const Event = (props) => {
    const { event } = props;
    const id = props.match.params.id;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (!isLoaded(event)){
        return (
            <div className="object-content">
                <h2>Event is loading...</h2>
            </div>
        );
    }
    
    if (isEmpty(event)) {
        return(
            <div className="object-content">
                <h2>Event is NOT FOUND</h2>
            </div>
        );
    }

    return(
        <div className="object-content">
            <h2>{event[id].name}</h2>
            <p>Occurred on: {event[id].date.toDate().toLocaleDateString("en-AU", options)}</p>
            <p>{event[id].details}</p>
            <ItemLinks title="Related Artefacts" items={event[id].artefacts_links}/>
        </div>
    );
} 

const mapStateToProps = (state) => {
    const event = state.firestore.data.Events;  
    return {
        event: event,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) =>[{
        collection: 'Events', 
        doc: props.match.params.id,
    }])
)(Event);
