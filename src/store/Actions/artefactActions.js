import {artifacts_collection} from '../../firebase/database';

const db = new artifacts_collection();
const ARTEFACT = 'Artefacts';

export const createArtefact = (artefact) => {
    return (dispatch, getState, {auth, firestore}) => {
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        console.log(artefact, authorId, profile);
        firestore.collection('artefacts').add({
            ...artefact,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_ARTEFACT_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'CREATE_ARTEFACT_ERROR' }, err);
        });
    }
}

export const fetechArtefacts = () => {
    return (dispatch, getState, {auth, firestore}) => {
        dispatch({ type: 'ARTEFACTS_LOADING' });

        return db.get_all_documents()
        .then((artefacts) => {
            dispatch({ type: 'FETCH_ARTEFACTS_SUCCESS', payload: artefacts})
        })
        .catch(error => dispatch({ type: 'FETCH_ARTEFACTS_ERROR', payload: error.message}))
    }
}