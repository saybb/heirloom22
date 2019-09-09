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

const Artifacts = {

    family_crest_drawing_id = {
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
        dev : "link to 1 event and 1 person \n\
               what it looks like https://bit.ly/2L7A4jB",
    },

    making_crest_id = {
        name: "recording of grandpa John making a crest",
        details: "I found this old recording of grandpa",
        event_links : [
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


    random_photos_id = {
        name: "random photos",
        created_by: "amanda",
        date_created: "02/09/2019",
        dev: "no links, no details"
    },

    family_crest_monument_id = {
        name: "Statue of the Coat of Arms of Gilbert",
        details: "Amazing statue that is embedded with family history \n\
                  Moved to Liam's new house",
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
        dev: "link to 2 events and 1 person \n\
               what it looks like https://bit.ly/324CaHY",
    }, 

    wedding_ring_id = {
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

    vase_id = {
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
    broke_vase = {
        name: "I broke the vase",
        details : "I tripped and broke and tipped the table over",
        artifact_link : "/Artifacts/vase_id",
        created_by: "amanda",
        date_created: "01/04/2019",
    }
}

const People = {

    amanda_gilbert_id = {
        name: "Amanda",
        lastname: "Gilbert",
        dob: "01/01/1991",
        details: "Daugther of Sam and Sarah"
    },

    sam_gilbert_id = {
        name: "Sam",
        lastname: "Gilbert",
        details: "Brother to Amanda"
    },

    john_gilbert_id = {
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

    sarah_gilbert_id = {
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

    melanie_gilbert_id = {
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

    liam_gilbert_id = {
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

// TODO by week 7 Monday
const Events = {

}

// Unlikely to be completed this sprint
const Users = {

}