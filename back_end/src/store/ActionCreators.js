import {auth, firestore, fireauth, firebasestore, firesotre} from '../firebase/firebase';


export const signIn = (cred) => (dispatch) => {
    return auth.signInWithEmailAndPassword( cred.email, cred.password)
    .then(() => {
        var user = auth.currentUser;
        dispatch({type: 'LOGIN_SUCCESS', user});
    }).catch(err => dispatch({type: 'LOGIN_ERROR', err}))
};

export const signUp = (newUser) => (dispatch) => {
    console.log(newUser);
    return auth.createUserWithEmailAndPassword( newUser.email, newUser.password)
    .then(resp => {
        return firesotre.collection('users').doc(resp.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        });
    }).then(() => {
        var user = auth.currentUser;
        dispatch({ type: 'SIGNUP_SUCCESS', user});
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
}


export const signOut = () => (dispatch) => {
    auth.signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      }).catch((err) => {
        // An error happened.
      });
}