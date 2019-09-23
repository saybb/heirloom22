/* * *
 * Event :: ReactJS Component
 * Page for the display of an Event.
 * The event should be passed to this component as the prop "event".
 * Created By: Lawson Wang-Wills
 */

import React from 'react';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";

const event = {
    name: "Making the family crest",
    date: "01/01/1980",
    details: "This is when the family crest was made.",
    date_created: "29/05/2000",
    crated_by: "amanda",
    artefacts_links: [
        {
            name: "Coat of arms of the Gilbert Monument",
            relation: "created during",
            reference: "Artefacts/family_crest_monument_id"
        },
        {
            name: "family crest drawing",
            relation: "created during",
            reference: "Artefacts/family_crest_drawing_id"
        },
        {
            name: "Recording of grandpa John making a crestt",
            relation: "recorded during",
            reference: "Artefacts/making_crest_id"
        },
    ]
}

function Event() {
    return(
        <div className="object-content">
            <h2>{event.name}</h2>
            <p>Occurred on: {event.date}</p>
            <p>{event.details}</p>
            <ItemLinks title="Related Artefacts" items={event.artefacts_links}/>
        </div>
    );
} 

export default Event;