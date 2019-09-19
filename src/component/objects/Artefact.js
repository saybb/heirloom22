/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 * Created By: Lawson Wang-Wills
 */

import React from 'react';
import ItemLinks from './ItemLinks.js';
import "./Objects.css";
import Addendum from "./Addendum";

// this is just sample data - in reality we will use props.artefact.
const artefact = {
    name: "Statue of the Coat of Arms of Gilbert",
    details: "Amazing statue that is embedded with family history. Of course, the family crest has no official meaning or clerical relevance, but it still remains to be a symbol of what John thought the family should stand for. That's something we can understand just by looking at this creation. Moved to Liam's new house",
    event_links: [
        {
            id: 1,
            name: "Making of the Family Crest",
            relation: "This is when the family crest was created.",
            reference: "/Events/making_crest_id"
        },
        {
            id: 2,
            name: "We moved into the current family house.",
            relation: "The family crest was moved into our family house when we moved. It was stored in the attic, among our other historical items.",
            reference: "/Events/moveing_in_id"
        },
    ],
    people_links: [
        {
            id: 1,
            name: "John Gilbert",
            relation: "John Gilbert crafted the family crest in his own time.",
            reference: "/People/john_gilbert_id"
        }
    ],
    created_by: "liam",
    date_created: "02/09/2018",
    dev: "link to 2 events and 1 person \nwhat it looks like https://bit.ly/324CaHY",
    image: "https://bit.ly/324CaHY"
} 
    
function Artefact() {
    /**
     * For an artefact, we intend to show:
     *   - image (will eventually be a gallery)
     *   - name of the artefact
     *   - description of the artefact
     *   - people links to the artefact + their relevant descriptions
     *   - event links to the artefact + their relevant descriptions
     */
    return (
        <div className="object">
            <div className="object-image-container">
                <img src={artefact.image} alt={artefact.name} />
            </div>
            <div className="object-content">
                <h2>{artefact.name}</h2>
                <p>{artefact.details}</p>
                {/* ItemLinks will render links as items with names and relation descriptors */}
                <ItemLinks title="Related People" items={artefact.people_links}/>
                <ItemLinks title="Related Events" items={artefact.event_links}/>
                <Addendum />
            </div>
        </div>
    );
}
export default Artefact;
