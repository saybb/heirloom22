import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase configuration
var config = {
    apiKey: "AIzaSyD1XO5L2AYwpimMVN6pzl2OtFRJE2yE9Zc",
    authDomain: "testing-e1ec1.firebaseapp.com",
    databaseURL: "https://testing-e1ec1.firebaseio.com",
    projectId: "testing-e1ec1",
    storageBucket: "testing-e1ec1.appspot.com",
    messagingSenderId: "656238030591",
    appId: "1:656238030591:web:ee3f92b02ce48007"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();

export const fireauth = firebase.auth;

export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;

export default firebase 