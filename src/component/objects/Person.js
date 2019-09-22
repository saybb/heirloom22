/* * *
 * Person :: ReactJS Component
 * Page for the display of a Person.
 * The person should be passed to this component as the prop "person".
 * Created By: Lawson Wang-Wills
 */

import React from 'react';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";

const person = {
    artefact_links: [
        {
            key: 0,
            name: "Coat of arms of the Gilbert Monument", 
            reference: "/Artifacts/family_crest_monument_id",
            relation: "made by"
        },
        {
            key: 1,
            name: "family crest drawing",
            reference: "/Artifacts/family_crest_drawing_id",
            relation: "made by",
        },
        {
            key: 2,
            name: "Recording of grandpa John making a crest",
            reference: "/Artifacts/making_crest_id",
            relation: "recording of"
        }
    ],
    date: null,
    date_created: "September 19, 2019 at 11:58:41 AM UTC+10",
    details: "Great crafts men. Grandpa of Ananda and Sam, father of Liam",
    dob: "January 1, 1971 at 12:00:00 AM UTC+10",
    lastname: "Gilbert",
    name: "John"
}

function Person() {
    return(
        <div className="object-content">
            <h2>{person.name + " " + person.lastname}</h2>
            <p>Born: {person.dob}</p>
            <p>{person.details}</p>
            <ItemLinks title="Related Artefacts" items={person.artefact_links}/>
        </div>
    );
} 

export default Person;