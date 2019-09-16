/* * *
 * ArtefactList :: ReactJS Component
 * A simple list view for browsing artefacts.
 * Requests for relevant content will be made from this component.
 * Created By: Lawson Wang-Wills
 */

import React from 'react';

// components
import ArtefactListElement from "./ArtefactListElement.js";
import './ArtefactList.css';


// sample data. This is just here for testing. It's a list of artefact objects.
const artefacts = [
    {
        name: "family crest drawing",
        details : "a very old drawing of family crest by grandpa",
        events_links : [
            {
                name: "Making the famly crest",
                relation: "created during",
                reference:  "Events/making_crest_id"
            }
        ],
        people_links : [
            {
                name: "John Gilbert",
                relation: "made by",
                reference: "People/john_gilbert_id"
            }
        ],
        created_by : "amanda",
        date_created : "02/09/2019",
        dev : "link to 1 event and 1 person \nwhat it looks like https://bit.ly/2L7A4jB",
    },
    {
        name: "recording of grandpa John making a crest",
        details: "I found this old recording of grandpa",
        events_links : [
            {
                name: "Making the famly crest",
                relation: "created during",
                reference:  "Events/making_crest_id"
            }
        ],
        people_links: [
            {
                name: "John Gilbert",
                relation: "recording of",
                reference: "People/john_gilbert_id"
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
                reference: "Events/making_crest_id"
            },
            {
                name: "moving in to the current family house",
                relation: "moved to",
                reference: "Events/moving_in_id"
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
        events_links: [
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

const Addendums = {
    broken_vase_comment_id : {
        name: "I broke the vase",
        details : "I tripped and broke and tipped the table over",
        reference : "/Artifacts/vase_id",
        created_by: "amanda",
        date_created: "01/04/2019",
    },

    event_comment_id : {
        name: "test comment on event",
        date_created: "08/04/2019",
        created: "amanda",
        reference: "/Artifacts/making_crest_id"
    }
    
}


const People = {

    amanda_gilbert_id : {
        name: "Amanda",
        lastname: "Gilbert",
        dob: "01/01/1991",
        details: "Daugther of Sam and Sarah"
    },

    sam_gilbert_id : {
        name: "Sam",
        lastname: "Gilbert",
        details: "Brother to Amanda"
    },

    john_gilbert_id : {
        name: "John",
        lastname: "Gilbert",
        dob: "01/01/1971",
        details: "Great crafts men. Grandpa of Ananda and Sam, father of Liam",
        artifacts_links: [
            {
                name: "Coat of arms of the Gilbert Monument",
                relation: "made by",
                reference: "/Artifacts/family_crest_monument_id"
            },
            {
                name: "family crest drawing",
                relation: "made by",
                reference: "/Artifacts/family_crest_drawing_id"
            },
            {
                name: "Recording of grandpa John making a crestt",
                relation: "recording of",
                reference: "/Artifacts/making_crest_id"
            },
        ],
    },

    sarah_gilbert_id : {
        name: "Sarah",
        lastname: "Gilbert",
        details: "Mother of Sam and Amanda. Married to Liam",
        artifacts_links: [
            {
                name: "weeding ring",
                relation: "owned by",
                reference: "/Artifacts/wedding_ring_id"
            },
        ],
    },

    melanie_gilbert_id : {
        name: "Melanie",
        lastname: "Gilbert",
        dob: "01/01/1970",
        details: "Mother of Liam. Married to John",
        artifacts_links: [
            {
                name: "weeding ring",
                relation: "owned by",
                reference: "/Artifacts/wedding_ring_id"
            },
        ],
    },

    liam_gilbert_id : {
        name: "Melanie",
        lastname: "Gilbert",
        details: "Father of Amanda and Sam",
        artifacts_links: [
            {
                name: "family vase",
                relation: "owned",
                reference: "/Artifacts/vase_id"
            },
        ],
    },
}

const Events = {
    
    moving_in_id : {
        name: "moving in to the current family house",
        date: "01/01/1985",
        date_created: "29/05/2000",
        crated_by: "liam",
        artifacts_links: [
            {
                name: "Coat of arms of the Gilbert Monument",
                relation: "moved to",
                reference: "/Artifacts/family_crest_monument_id"
            }, 
        ]
    },

    making_crest_id : {
        name: "Making the family crest",
        date: "01/01/1980",
        date_created: "29/05/2000",
        crated_by: "amanda",
        artifacts_links: [
            {
                name: "Coat of arms of the Gilbert Monument",
                relation: "created during",
                reference: "/Artifacts/family_crest_monument_id"
            },
            {
                name: "family crest drawing",
                relation: "created during",
                reference: "/Artifacts/family_crest_drawing_id"
            },
            {
                name: "Recording of grandpa John making a crestt",
                relation: "recorded during",
                reference: "/Artifacts/making_crest_id"
            },
        ]
    },


    wedding_sarah_id  : {
        name: "sarah and liam got married",
        date: "01/01/1983",
        date_created: "29/06/2000",
        crated_by: "liam",
        artifacts_links: [
            {
                name: "wedding ring",
                relation: "used during",
                reference: "/Artifacts/wedding_ring_id"
            },
        ], 
    },

    wedding_melanie_id  : {
        name: "melanie and john got married",
        date: "01/01/1952",
        date_created: "29/06/2000",
        crated_by: "liam",
        artifacts_links: [
            {
                name: "weeding ring",
                relation: "used during",
                reference: "/Artifacts/wedding_ring_id"
            },
        ], 
    },
}

const Users = {
    amanda_user_id : {
        username: "amanda",
        reference: "People/amanda_gilbert_id",
        password: "amanda123",
        email: "amanda@gmail.com"
    },

    liam_user_id : {
        username: "liam",
        reference: "People/liam_gilbert_id",
        password: "liam123",
        email: "liam@gmail.com"
    },

    admin_user_id : {
        username: "admin",
        password: "amdin123",
        email: "admin@gmail.com"
    },
}


class ArtefactList extends React.Component {
    state = {
        artefacts: artefacts
    }

    render() {
        return(
            <div className="ArtefactList">
                <h2>Browsing your collection...</h2>
                { // generates an ArtefactListElement for each artefact using map
                    artefacts.map((artefact) => (
                        <ArtefactListElement artefact={artefact} />
                    ))
                }
            </div> 
        );
    }
}

export default ArtefactList;
