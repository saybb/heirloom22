/* 
Visualization:  https://www.lucidchart.com/documents/view/d774e941-dcb7-4958-bd4a-319760d1d337/0_0

I have simplified a few things in this representation
1. reference 
    - from: a Firebase object 
    - to: "path/to/document"
2. date_created 
    - from: a Time object
    - to: a string

Note
1. I am using dev keyward to save JSON comment 
2. I have included some links to multimedia in dev for reference.
   I am not working on multimedia support for this sprint.
*/

const Artefacts = {

    family_crest_drawing_id: {
        name: "family crest drawing",
        details : "a very old drawing of family crest by grandpa",
        events_links : [
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
        dev : "link to 1 event and 1 person \n\
               what it looks like https://bit.ly/2L7A4jB",
    },

    making_crest_id : { 
        name: "recording of grandpa John making a crest",
        details: "I found this old recording of grandpa",
        events_links : [
            {
                name: "Making the famly crest",
                relation: "created during",
                reference:  "/Events/making_crest_id"
            }
        ],
        people_links: [
            {
                name: "John Gilbert",
                relation: "recording of",
                reference: "/People/john_gilbert_id"
            }
        ],
        created_by: "amanda",
        date_created: "02/09/2019",
        dev: "link to 0 event and 1 person \n\
               what it looks like https://bit.ly/2ZhlArh",
    },


    random_photos_id : {
        name: "random photos",
        created_by: "amanda",
        date_created: "02/09/2019",
        dev: "no links, no details"
    },

    family_crest_monument_id : {
        name: "Statue of the Coat of Arms of Gilbert",
        details: "Amazing statue that is embedded with family history. Of course, the family crest has no official meaning or clerical relevance, but it still remains to be a symbol of what John thought the family should stand for. That's something we can understand just by looking at this creation. Moved to Liam's new house",
        events_links: [
            {
                name: "Making of the Family Crest",
                relation: "This is when the family crest was created.",
                reference: "/Events/making_crest_id"
            },
            {
                name: "We moved into the current family house.",
                relation: "The family crest was moved into our family house when we moved. It was stored in the attic, among our other historical items.",
                reference: "/Events/moving_in_id"
            },
        ],
        people_links: [
            {
                name: "John Gilbert",
                relation: "John Gilbert crafted the family crest in his own time.",
                reference: "/People/john_gilbert_id"
            }
        ],
        created_by: "liam",
        date_created: "02/09/2018",
        dev: "link to 2 events and 1 person \nwhat it looks like https://bit.ly/324CaHY",
        image: "https://bit.ly/324CaHY"
    } , 

    wedding_ring_id : {
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

    vase_id : {
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
        dev: "link to 0 event and 1 person \n\
              test addendums" 
    }
}

const Addendums = {
    broken_vase_comment_id : {
        name: "I broke the vase, I am sorry",
        details : "I tripped and broke and tipped the table over",
        reference : "/Artefacts/vase_id",
        created_by: "amanda",
        date_created: "01/04/2019",
    },

    event_comment_id : {
        name: "test comment on event",
        date_created: "08/04/2019",
        created_by: "amanda",
        reference: "/Artefacts/making_crest_id"
    }
    
}


const People = {

    amanda_gilbert_id : {
        date_created: "29/06/2000",
        created_by: "liam",
        name: "Amanda",
        lastname: "Gilbert",
        dob: "01/01/1991",
        details: "Daugther of Sam and Sarah"
    },

    sam_gilbert_id : {
        date_created: "29/06/2000",
        created_by: "liam",
        name: "Sam",
        lastname: "Gilbert",
        details: "Brother to Amanda"
    },

    john_gilbert_id : {
        date_created: "29/06/2000",
        created_by: "liam",
        name: "John",
        lastname: "Gilbert",
        dob: "01/01/1971",
        details: "Great crafts men. Grandpa of Ananda and Sam, father of Liam",
        Artefacts_links: [
            {
                name: "Coat of arms of the Gilbert Monument",
                relation: "made by",
                reference: "/Artefacts/family_crest_monument_id"
            },
            {
                name: "family crest drawing",
                relation: "made by",
                reference: "/Artefacts/family_crest_drawing_id"
            },
            {
                name: "Recording of grandpa John making a crestt",
                relation: "recording of",
                reference: "/Artefacts/making_crest_id"
            },
        ],
    },

    sarah_gilbert_id : {
        date_created: "29/06/2000",
        created_by: "liam",
        name: "Sarah",
        lastname: "Gilbert",
        details: "Mother of Sam and Amanda. Married to Liam",
        Artefacts_links: [
            {
                name: "weeding ring",
                relation: "owned by",
                reference: "/Artefacts/wedding_ring_id"
            },
        ],
    },

    melanie_gilbert_id : {
        date_created: "29/06/2000",
        created_by: "liam",
        name: "Melanie",
        lastname: "Gilbert",
        dob: "01/01/1970",
        details: "Mother of Liam. Married to John",
        Artefacts_links: [
            {
                name: "weeding ring",
                relation: "owned by",
                reference: "/Artefacts/wedding_ring_id"
            },
        ],
    },

    liam_gilbert_id : {
        date_created: "29/06/2000",
        created_by: "liam",
        name: "Melanie",
        lastname: "Gilbert",
        details: "Father of Amanda and Sam",
        Artefacts_links: [
            {
                name: "family vase",
                relation: "owned",
                reference: "/Artefacts/vase_id"
            },
        ],
    },
}

const Events = {
    
    moving_in_id : {
        name: "moving in to the current family house",
        date: "01/01/1985",
        date_created: "29/05/2000",
        created_by: "liam",
        Artefacts_links: [
            {
                name: "Coat of arms of the Gilbert Monument",
                relation: "moved to",
                reference: "/Artefacts/family_crest_monument_id"
            }, 
        ]
    },

    making_crest_id : {
        name: "Making the family crest",
        date: "01/01/1980",
        date_created: "29/05/2000",
        created_by: "amanda",
        Artefacts_links: [
            {
                name: "Coat of arms of the Gilbert Monument",
                relation: "created during",
                reference: "/Artefacts/family_crest_monument_id"
            },
            {
                name: "family crest drawing",
                relation: "created during",
                reference: "/Artefacts/family_crest_drawing_id"
            },
            {
                name: "Recording of grandpa John making a crestt",
                relation: "recorded during",
                reference: "/Artefacts/making_crest_id"
            },
        ]
    },


    wedding_sarah_id  : {
        name: "sarah and liam got married",
        date: "01/01/1983",
        date_created: "29/06/2000",
        created_by: "liam",
        Artefacts_links: [
            {
                name: "wedding ring",
                relation: "used during",
                reference: "/Artefacts/wedding_ring_id"
            },
        ], 
    },

    wedding_melanie_id  : {
        name: "melanie and john got married",
        date: "01/01/1952",
        date_created: "29/06/2000",
        created_by: "liam",
        Artefacts_links: [
            {
                name: "weeding ring",
                relation: "used during",
                reference: "/Artefacts/wedding_ring_id"
            },
        ], 
    },
}

const Users = {
    amanda_user_id : {
        uid: "amanda",
        reference: "/People/amanda_gilbert_id",
        password: "amanda123",
        email: "amanda@gmail.com"
    },

    liam_user_id : {
        uid: "liam",
        reference: "/People/liam_gilbert_id",
        password: "liam123",
        email: "liam@gmail.com"
    },

    admin_user_id : {
        uid: "admin",
        password: "amdin123",
        email: "admin@gmail.com"
    },
}