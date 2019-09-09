// frequent DOM access
const reset = document.querySelector('#reset');

// event trigger
// TODO add async await
reset.addEventListener('click',
    (e) => {
        e.stopPropagation();

        // delete
        delete_collection("cafes")

        // then upload

        upload_collection("Artifacts", Artifacts);
        upload_collection("Addendums", Addendums);
        upload_collection("People", People);
        upload_collection("Users", Users);
        upload_collection("Events", Events);
    }
)

// delete everything
function delete_collection(path) {
    db.collection(path).get()
    .then(
        (snapshot) => {
            snapshot.docs.forEach(
                (doc) => {
                    db.collection(path).doc(doc.id).delete();
                }
            )
        }
    )
    .catch(function (error) {
        console.error("Error deleteing document: ", error);
    });
};

// convert date from string to firebase object
function convert_date(text) {
    return firebase.firestore.Timestamp.fromDate(new Date(text))
}

// convert datecreated to server time stamp
function server_time_stamp() {
    return new firebase.firestore.FieldValue.serverTimestamp()
}

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
            console.log(docId);
            console.log(value);
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.log(docId);
            console.log(value);
            console.error("Error writing document: ", error);
        });
    });
}
