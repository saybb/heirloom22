///////////////// Tools /////////////////////
// Parse test data to the appropriate data format

// convert date from string to firebase object
function convert_date(text) {
    return firebase.firestore.Timestamp.fromDate(new Date(text));
};

// convert datecreated to server time stamp
function server_time_stamp() {
    return new firebase.firestore.FieldValue.serverTimestamp();
};

// convert string path to firebase document reference
function convert_reference(text) {
    return db.doc(text);
};

///////////////// Logic /////////////////////

// buttons
const delete_button = document.querySelector('#delete');
const upload_button = document.querySelector('#upload');

// trigger
delete_button.addEventListener('click',
    (e) => {
        e.stopPropagation();

        delete_collection("cafes");
        delete_collection("Artifacts");
        delete_collection("Addendums");
        delete_collection("People");
        delete_collection("Users");
        delete_collection("Events");
    }
);
upload_button.addEventListener('click',
    (e) => {
        e.stopPropagation();

        upload_collection("Artifacts", Artifacts);
        upload_collection("Addendums", Addendums);
        upload_collection("People", People);
        upload_collection("Users", Users);
        upload_collection("Events", Events);
    }
);


// delete everything
function delete_collection(path) {
    db.collection(path).get()
    .then(
        (snapshot) => {
            snapshot.docs.forEach(
                (doc) => {
                    console.log("Deleting");
                    console.log(doc.id);
                    db.collection(path).doc(doc.id).delete();
                }
            )
        }
    )
    .catch(function (error) {
        console.error("Error deleteing document: ", error);
    });
};

// upload test data
function upload_collection(path, javascript_object) {

    // convert the javascript object into a list of list
    // each list is a [document id, document data] pair
    var document = Object.entries(javascript_object);

    // go through each document
    document.forEach(document => {
        let docId = document[0];
        let value = document[1];

        // add to database
        db.doc(path + '/' + docId).set(value)
        .then(function () {
            console.log("Uploading")
            console.log(docId);
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.log("Uploading")
            console.log(docId);
            console.error("Error writing document: ", error);
        });
    });
}
