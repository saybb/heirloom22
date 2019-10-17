import firebase from "../../firebase/config";

export const createObj = (objType, obj) => {
   return (dispatch, getState, {auth, firestore}) => {
      firestore
         .collection(objType)
         .add({
            ...obj,
            authroId: auth.currentUser.uid,
            created_by: auth.currentUser.displayName,
            date_created: new Date(),
            last_modified: new Date()
         })
         .then(doc => {
            dispatch({
               type: "CREATE_SUCCESS",
               doc: doc
            });
         })
         .catch(err => {
            console.log(err);
            dispatch(
               {
                  type: "CREATE_ERROR"
               },
               err
            );
         });
   };
};

export const editObj = (objType, docId, obj) => {
   return (dispatch, getState, {firestore}) => {
      Object.keys(obj).forEach(key => {
         if (!obj[key] || (obj[key] || []).length === 0) delete obj[key];
      });
      var ref = firestore.collection(objType).doc(docId);
      ref.update({
         ...obj,
         last_modified: new Date()
      })
         .then(() => {
            dispatch({type: "EDIT_SUCCESS"});
         })
         .catch(err => {
            console.log(err);
            dispatch({type: "EDIT_ERROR"}, err);
         });
   };
};

// export const deleteObj = (objType, docId) => {
//     return (dispatch, getState, { firestore }) => {
//         const ref = firestore.collection(objType).doc(docId)
//         ref.delete()
//         .then(() => {
//             dispatch({ type: 'DELETE_SUCCESS' });
//         }).catch(err => {
//             console.log(err);
//             dispatch({ type: 'DELETE_ERROR'}, err);
//         })
//     }
// }

/*
    remove all relations that this object is currently having,
    and clean up all relations in other objects before deleting.
*/
export const deleteObj = (objType, docId) => {
   return async (dispatch, getState, {firestore}) => {
      const ref = firestore.collection(objType).doc(docId);
      const snapshot = await ref.get();
      const doc = snapshot.data();
      if (doc.artefacts_links) {
         doc.artefacts_links.forEach(item => {
            dispatch(
               deleteRelation(objType, docId, item.reference, "artefacts_links")
            );
         });
      }
      if (doc.people_links) {
         doc.people_links.forEach(item => {
            dispatch(
               deleteRelation(objType, docId, item.reference, "people_links")
            );
         });
      }
      if (doc.events_links) {
         doc.events_links.forEach(item => {
            dispatch(
               deleteRelation(objType, docId, item.reference, "events_links")
            );
         });
      }
      ref.delete()
         .then(() => {
            dispatch({type: "DELETE_SUCCESS"});
         })
         .catch(err => {
            console.log(err);
            dispatch({type: "DELETE_ERROR"}, err);
         });
   };
};

export const uploadFile = (path, file) => {
   return (dispatch, getState, {storageRef}) => {
      storageRef
         .child(path)
         .put(file)
         .then(snapshot => {
            snapshot.ref
               .getDownloadURL()
               .then(downloadURL => {
                  dispatch({type: "UPLOAD_SUCCESS", downloadURL: downloadURL});
               })
               .catch(err => {
                  console.log(err);
                  dispatch({type: "UPLOAD_ERROR"});
               });
         });
   };
};

export const fieldAppend = (objType, docId, fieldName, fieldValue) => {
   return (dispatch, getState, {firestore}) => {
      var ref = firestore.collection(objType).doc(docId);
      ref.update({
         [fieldName]: firebase.firestore.FieldValue.arrayUnion(fieldValue)
      })
         .then(() => {
            dispatch({type: "APPEND_SUCCESS"});
         })
         .catch(err => {
            console.log(err);
            dispatch({type: "APPEND_ERROR"}, err);
         });
   };
};

/* 
deleteRelation: set up a relation for an object (which launches a set up relation request)
     and target object. It works for both sides.

targetRef: the referece pointing to the target object
fieldName: a particular field that target object holds the relations of this object type.
*/

export const deleteRelation = (objType, docId, targetRef, fieldName) => {
   return async (dispatch, getState, {firestore}) => {
      try {
         const objRef = await firestore.doc(objType + "/" + docId);
         const snapshot_1 = await objRef.get();
         if (snapshot_1.data()) {
            const obj = DeleteRelationField(
               snapshot_1.data(),
               fieldName,
               targetRef
            );
            await objRef.update({
               ...obj,
               last_modified: new Date()
            });
         }

         const snapshot_2 = await targetRef.get();
         if (snapshot_2.data()) {
            const targetObj = DeleteRelationField(
               snapshot_2.data(),
               `${objType.toLowerCase()}_links`,
               objRef
            );
            await targetRef.update({
               ...targetObj,
               last_modified: new Date()
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

//remove selected relation from an object
function DeleteRelationField(obj, field, reference) {
   if ((obj[field] || []).length > 0) {
      var new_field = obj[field].filter(link => {
         return link.reference.id !== reference.id;
      });
      obj[field] = new_field;
   }
   return obj;
}
