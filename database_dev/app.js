// asyn request that returns a promise
// so I give it a call backfunctions that takes the turned scnapshot
// I get a list of all current documents in the "cafe" collections
db.collection('cafes').get().then(
    (snapshot) => {
        console.log(snapshot.docs)
    }
)