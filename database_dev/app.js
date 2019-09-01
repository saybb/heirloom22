// DOM objects that we will refer to frequently
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// asyn request that returns a promise
// so I give it a call backfunctions that takes the turned scnapshot
// I get a list of all current documents in the "cafe" collections
// This includes a lot of meta data
db.collection('cafes').get().then(
    (snapshot) => {
        console.log(snapshot.docs)
    }
)

// get the data for each document
// docs is an array of documents that belongs to that collection
// doc.data extracts data for that documents
// db.collection('cafes').get().then(
//     (snapshot) => {
//         snapshot.docs.forEach(
//             (doc) => {
//                 console.log(doc.data())
//             }
//         )
//     }
// );

// create element and render them
function renderCafe(doc) {
    // crate a list element
    // save document id to the list
    // we need data id for deleting things
    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    // display the data
    let name = document.createElement('span');
    let age = document.createElement('span');
    // display a cross button to delete data
    let cross = document.createElement('div');

    cross.textContent = 'x'
    name.textContent = doc.data().name;
    age.textContent = doc.data().age;
    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(cross)

    // save the list element to a list we selected
    cafeList.appendChild(li);

    // when the cross is clicked
    // delete data function associated to each list item
    cross.addEventListener('click', 
        (e) => {
            e.stopPropagation();
            // get the id of the parent which is the list element
            // let id = e.target.parentElement.getAttribute('data-id');
            // query the database to delete it
            // db.collection('cafes').doc(id).delete();
            db.collection('cafes').doc(doc.id).delete();
        }
    )

}

// render each document once only
// db.collection('cafes').get().then(
//     (snapshot) => {
//         snapshot.docs.forEach(
//             (doc) => renderCafe(doc)
//         )
//     }
// );

// saving data
// Link to the form on HTML
// Listen to the submission button press
form.addEventListener('submit', 
    (e) => {
        // link to the form

        // prevent reloading which stops program from executing
        e.preventDefault();

        // upload the document
        db.collection('cafes').add({
            // create a json object
            name: form.name.value,
            age: Number(form.age.value)
        });

        // // reset the values of the form
        form.name.value = '';
        form.age.value = '';
    }
);

// realtime update
db.collection('cafes').orderBy('age').onSnapshot(
    (snapshot) => {
        // check all the changes
        let changes = snapshot.docChanges();
        changes.forEach(
            (change) => {
                console.log(change.doc.data());
                if (change.type == 'added') {
                    renderCafe(change.doc);
                } else if (change.type == 'removed') {
                    let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                    cafeList.removeChild(li);
            }
        }
    );
});
