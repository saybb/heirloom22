import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase configuration
const config = {
    apiKey: "AIzaSyC1HQX45nzJr6SDRMsPkA_zAgAYM9iGjTg",
    authDomain: "heirloom22-2b4a8.firebaseapp.com",
    databaseURL: "https://heirloom22-2b4a8.firebaseio.com",
    projectId: "heirloom22-2b4a8",
    storageBucket: "heirloom22-2b4a8.appspot.com",
    messagingSenderId: "323147351760",
    appId: "1:323147351760:web:bf785136b38cb3a4d380d5"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();

export const fireauth = firebase.auth;

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;

export const storageRef = firebase.storage().ref();

export default firebase 