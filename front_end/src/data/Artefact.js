import React from 'react';
import "./Artefact.css";

import {Divider} from "antd";

function Artefact() {
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

    function People(props) {
        const {people} = props;
        return(
            <React.Fragment>
                <h3>Related People</h3>
                <div className="ArtefactRelations">
                    { people.map((person) => <Person person={person}/>) }
                </div>
            </React.Fragment>
        );
    }

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

    function Events(props) {
        const {events} = props;

        return(
            <React.Fragment>
                <h3>Related Events</h3>
                <div className="ArtefactRelations">
                    { events.map((event) => <Event event={event}/>) }
                </div>
            </React.Fragment>
        );
    }

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
