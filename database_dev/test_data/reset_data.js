// frequent DOM access
const reset = document.querySelector('#reset');

// delete everything

// reset.addEventListener('click',
//     (e) => {
//         e.stopPropagation();
//         // get all the documents and delete all of them
//         db.collection('cafes').get().then(
//             (snapshot) => {
//                 snapshot.docs.forEach(
//                     (doc) => {
//                         db.collection('cafes').doc(doc.id).delete();
//                     }
//                 )
//             }
//         );
//     }
// )

// reload everything

// const list_json_file = [
//     {
//         name: "Amanda",
//         age: 40
//     },
//     {
//         first_name: "Sam",
//         second_name: "" 
//     },
//     {
//         first_name: "Liam",
//         second_name: "Gilbert" 
//     },
//     {
//         first_name: "Sarah",
//         second_name: "Gilbert" 
//     },
//     {
//         first_name: "Melanie",
//         age: "Gilbert" 
//     }
// ]