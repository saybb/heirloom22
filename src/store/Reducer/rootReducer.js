import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import userReducer from './userReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  user: authReducer,
  objects: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer
