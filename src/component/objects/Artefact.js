/* * *
 * Artefact :: ReactJS Component
 * Page for the display of an Artefact.
 * The artefact should be passed to this component as the prop "artefact".
 * Created By: Lawson Wang-Wills
 */

import React from 'react';

// components
import "./Artefact.css";
import {Divider} from "antd";

/**
 * Function element:
 * Props:
 *   - artefact : the artefact json object to display.
 */
function Artefact() {
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
 

    /**
     * For an artefact, we intend to show:
     *   - image (will eventually be a gallery)
     *   - name of the artefact
     *   - description of the artefact
     *   - people links to the artefact + their relevant descriptions
     *   - event links to the artefact + their relevant descriptions
     */
    return (
        <div className="Artefact">
            <div className="ArtefactImageContainer">
                <img src={artefact.image} alt={artefact.name} />
            </div>
            <div className="ArtefactContent">
                <h2>{artefact.name}</h2>
                <p>{artefact.details}</p>
                <People people={artefact.people_links}/>
                <Events events={artefact.event_links}/>
            </div>
        </div>
    );


    /**
     * Function subcomponent: People.
     * Renders a list of people links.
     * 
     * Props:
     *   - people : list of people links to render
     */
    function People(props) {
        const {people} = props;

        // if no people links exist then don't render anything
        if (!people) {
            return null;
        }

        return(
            <React.Fragment>
                <h3>Related People</h3>
                <div className="ArtefactRelations">
                    { // generates a person for each link
                        people.map((person) => <Person person={person}/>)
                    }
                </div>
            </React.Fragment>
        );
    }


    /**
     * Function subcomponent: Person
     * Renders a single person link.
     * 
     * Props:
     *   - person : person link to render
     */
    function Person(props) {
        const {person} = props;

        return(
            <React.Fragment>
                <div className="ArtefactRelation">
                    <h4>{person.name}</h4>
                    <p>{person.relation}</p>
                </div>
                <Divider className="ArtefactRelationDivider"/>
            </React.Fragment>
        );
    }


    /**
     * Function subcomponent: Events.
     * Renders a list of event links.
     * 
     * Props:
     *   - events : list of event links to render
     */
    function Events(props) {
        const {events} = props;
        
        // if no event links exist then don't render anything
        if (!events) {
            return null;
        }

        return(
            <React.Fragment>
                <h3>Related Events</h3>
                <div className="ArtefactRelations">
                    { // generates an event for each link
                        events.map((event) => <Event event={event}/>)
                    }
                </div>
            </React.Fragment>
        );
    }


    /**
     * Function subcomponent: Event
     * Renders a single event link.
     * 
     * Props:
     *   - event : event link to render
     */
    function Event(props) {
        const {event} = props;

        return(
            <React.Fragment>
                <div className="ArtefactRelation">
                    <h4>{event.name}</h4>
                    <p>{event.relation}</p>
                </div>
                <Divider className="ArtefactRelationDivider"/>
            </React.Fragment>
        );
    }

}

export default Artefact;
