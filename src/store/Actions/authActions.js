import { USERS } from '../../store/objectTypes';

export const signIn = (credentials) => {
    return (dispatch, state, {auth}) => {
            
      auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }
  
export const signOut = () => {
  return (dispatch, state, {auth}) => {

    auth.signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}
  
export const signUp = (newUser) => {
  return (dispatch, state, {auth, firestore}) => {

    auth.createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      delete newUser['password'];
      newUser.photoURL = "https://firebasestorage.googleapis.com/v0/b/testing-e1ec1.appspot.com/o/No%20profile%20photo.png?alt=media&token=23fa70a3-c8a7-409d-bd73-0d38ed8772d6";
      return firestore.collection(USERS).doc(resp.user.uid).set(newUser)
      .then(() => {
        var user = auth.currentUser;
        user.updateProfile({ displayName: newUser.name});
      }).catch(err => { console.log('Set up user profile ERROR')});
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const updateUserProfile = (info) => {
  return (dispatch, state, {auth, firestore}) => {
    var user = auth.currentUser;
    var infoElement = ["name", "lastName", "location", "bio", "photoURL"];
    Object.keys(info).forEach(key => {
      if(!infoElement.includes(key)||!info[key]||info[key] === '') {delete info[key]}
    })
    firestore.collection(USERS).doc(user.uid).update({
            ...info,
    }).then(() => {
      var user = auth.currentUser;
      user.updateProfile({ displayName: info.name});
    }).catch(err => { console.log('Set up user profile ERROR')})
    .then(() => {
      dispatch({ type: 'PROFILE_UPDATE_SUCCESS'});
    }).catch((err) => {
      dispatch({ type: 'PROFILE_UPDATE_ERROR'});
    });
  }
}
