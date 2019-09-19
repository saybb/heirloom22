/**
 * An independent database component
 */

/******************* Configuration ************************/
import "./config.js";

/******************* Generic Class ************************/
/**
 * 1. get all the data
 *      returns: an objects {id1 : data1, id2 : data2, ....}
 * 2. get a single data
 *      returns: an object {id : data}
 */
class Document{
    constructor(data) {
        this.data = data
    }
}

class Collection{

    constructor(firestore, name) {
        this.db = firestore
        this.name = name
    }

    async get_all_document() {
        console.log("get_all_documents from " + this.name)
        try {
            var snapshot = await this.db.collection(this.name).get()
            var documents = snapshot.docs
            var data = this.grab_data(documents)
            return data
        } catch (error) {
            console.error("ERROR")
            return error
        }
    };

    async get_document_by_id(document_id) {
        console.log("get_document_by_id from " + this.name + " using " + document_id)
        try {
            var snapshot = await this.db.collection(this.name).get(document_id)
            var data = snapshot.data 
            return data
        } catch (error) {
            console.error("ERROR")
            return error
        }
    }
    async upload_document() {}
    async upload_document_by_id(document_id) {}

    grab_data(documents) {
        var data = []
        for (const doc of documents) {
            data.push(doc.data())
        }
        return data
    }
}

class artifacts_collection extends collection {
    constructor(firestore){
        super(firestore, "Artifacts")
    }

}

async function get_all() {
    collection = new artifacts_collection(db)
    result = await collection.get_all_document() 
    console.log(result)
}

async function get() {
    collection = new artifacts_collection(db)
    document = ""
    result = await collection.get_all_document() 
    console.log(result)
}



/******************* Convert data ************************/

// convert date from string to firebase object
function convert_date(text) {
    if (empty(text)) return null
    return new firebase.firestore.Timestamp.fromDate(new Date(text))
}

// convert datecreated to server time stamp
function server_time_stamp() {
    return new firebase.firestore.FieldValue.serverTimestamp()
}

// convert string path to firebase document reference
function convert_reference(text) {
    if (empty(text)) return null
    return db.doc(text);
}

// artifacts
// people
// events