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
db.collection('cafes').get().then(
    (snapshot) => {
        snapshot.docs.forEach(
            (doc) => {
                console.log(doc.data())
            }
        )
    }
)

// create element and render them
function renderCafe(doc) {
    // crate a list element
    // save document id to the list
    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    // display the data
    let name = document.createElement('span');
    let city = document.createElement('span');
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    li.appendChild(name);
    li.appendChild(city);
    // save the list element to a list we selected
    const cafeList = document.querySelector('#cafe-list');
    cafeList.appendChild(li);
}

// render each document
db.collection('cafes').get().then(
    (snapshot) => {
        snapshot.docs.forEach(
            (doc) => renderCafe(doc)
        )
    }
)