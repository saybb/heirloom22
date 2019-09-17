import userReducer from './userReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import artefactReducer from './artefactReducer';

const rootReducer = combineReducers({
  user: userReducer,
  artefact: artefactReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer
