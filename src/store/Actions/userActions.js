export const createObj = (objType, obj) => {
    return (dispatch, getState, { auth, firestore }) => {
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection(objType).add({
            ...obj,
            created_by: profile.name,
            authorId: authorId,
            date_created: new Date(),
            last_modified: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'CREATE_ERROR' }, err);
        });
    }
}

export const editObj = (objType, docId, obj) => {
    return (dispatch, getState, { firestore }) => {
        Object.keys(obj).forEach(key => {if (!obj[key] || (obj[key] || []).length === 0)  delete obj[key]})
        var ref = firestore.collection(objType).doc(docId)
        ref.update({
            ...obj,
            last_modified: new Date()
        }).then(() => {
            dispatch({ type: 'EDIT_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'EDIT_ERROR' }, err);
        });
    }
}

export const deleteObj = (objType, docId) => {
    return (dispatch, getState, { firestore }) => {
        firestore.collection(objType).doc(docId)
        .delete()
        .then(() => {
            dispatch({ type: 'DELETE_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'DELETE_ERROR'}, err);
        })
    }
}

export const uploadFile = (path, file) => {
    return (dispatch, getState, { storageRef }) => {
        storageRef.child(path).put(file)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                dispatch({ type: 'UPLOAD_SUCCESS', downloadURL: downloadURL});
              }).catch(err => {
                  console.log(err);
                  dispatch({ type: 'UPLOAD_ERROR' })
              })
        })
    }
}

