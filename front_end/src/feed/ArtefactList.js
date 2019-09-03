/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 * Created By: Lawson Wang-Wills
 */

// libs
import React from 'react';

// components

// sample data. This is just here for testing. It's a list of artefact objects.
const artefacts = [
    {
        name: "family crest drawing",
        details : "a very old drawing of family crest by grandpa",
        event_links : [
            {
                name: "Making the famly crest",
                relation: "created during",
                reference:  "/Events/making_crest_id"
            }
        ],
        people_links : [
            {
                name: "John Gilbert",
                relation: "made by",
                reference: "/People/john_gilbert_id"
            }
        ],
        created_by : "amanda",
        date_created : "02/09/2019",
        dev : "link to 1 event and 1 person \nwhat it looks like https://bit.ly/2L7A4jB",
    },
    {
        name: "recording of grandpa John making a crest",
        details: "I found this old recording of grandpa",
        people_links: [
            {
                name: "John Gilbert",
                relation: "recording of",
                reference: "/People/john_gilbert_id"
            }
        ],
        created_by: "amanda",
        date_created: "02/09/2019",
        dev: "link to 0 event and 1 person \nwhat it looks like https://bit.ly/2ZhlArh",
    },
    {
        name: "random photos",
        created_by: "amanda",
        date_created: "02/09/2019",
        dev: "no links, no details"
    },
    {
        name: "Statue of the Coat of Arms of Gilbert",
        details: "Amazing statue that is embedded with family history \nMoved to Liam's new house",
        event_links: [
            {
                name: "Making the famly crest",
                relation: "created during",
                reference: "/Events/making_crest_id"
            },
            {
                name: "moving in to the current family house",
                relation: "moved to",
                reference: "/Events/moveing_in_id"
            },
        ],
        people_links: [
            {
                name: "John Gilbert",
                relation: "made by",
                reference: "/People/john_gilbert_id"
            }
        ],
        created_by: "liam",
        date_created: "02/09/2018",
        dev: "link to 2 events and 1 person \nwhat it looks like https://bit.ly/324CaHY",
    }, 
    {
        name: "wedding ring",
        details: "The wedding ring passed down through generations",
        event_links: [
            {
                name: "Sarah and Liam got married",
                relation: "used during",
                reference: "/Events/wedding_sarah_id"
            },
            {
                name: "Melanie and John got married",
                relation: "used during",
                reference: "/Events/wedding_melanie_id"
            },
        ],
        people_links: [
            {
                name: "Sarah Gilbert",
                relation: "owned by",
                reference: "/People/sarah_gilbert_id"
            },
            {
                name: "Melanie Gilbert",
                relation: "owned by",
                reference: "/People/melanie_gilbert_id"
            }
        ],
        created_by: "amanda",
        date_created: "02/09/2019",
        dev: "link to 2 events and 2 people" 
    }, 
    {
        name: "traditional Chinese vase",
        details: "An vase I received as a gift from my student Bob in 1990 Christmas", 
        people_links: [
            {
                name: "Liam Gilbert",
                relation: "owned by",
                reference: "/People/liam_gilbert_id"
            },        
        ],
        created_by: "liam",
        date_created: "01/10/2018",
        dev: "link to 0 event and 1 person \ntest addendums" 
    }
]

// class
class ArtefactList extends React.Component {
    state = {
        artefacts: artefacts
    }

    render() {
        return(
            <div><p>Content Here :)</p></div> 
        );
    }
}

export default ArtefactList;