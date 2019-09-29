const ARTEFACTS = 'Artefacts';

export const createArtefact = (artefact) => {
    return (dispatch, getState, { auth, firestore }) => {
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        console.log(artefact, authorId, profile);
        firestore.collection(ARTEFACTS).doc(artefact.name + '_id').set({
            ...artefact,
            created_by: profile.name,
            authorId: authorId,
            date_created: new Date(),
            last_modified: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_ARTEFACT_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'CREATE_ARTEFACT_ERROR' }, err);
        });
    }
}

export const editArtefact = (docId, artefact) => {
    return (dispatch, getState, { firestore }) => {
        var ref = firestore.collection(ARTEFACTS).doc(docId)
        ref.update({
            ...artefact,
            last_modified: new Date()
        }).then(() => {
            dispatch({ type: 'EDIT_ARTEFACT_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'EDIT_ARTEFACT_ERROR' }, err);
        });
    }
}

export const deleteArtefact = (docId) => {
    return (dispatch, getState, { firestore }) => {
        firestore.collection(ARTEFACTS).doc(docId)
        .delete()
        .then(() => {
            dispatch({ type: 'DELETE_ARTEFACT_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'DELETE_ARTEFACT_ERROR'});
        })
    }
}

