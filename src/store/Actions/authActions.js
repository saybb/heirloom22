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
      console.log(newUser);
      return firestore.collection('users').doc(resp.user.uid).set(newUser)
      .then(() => {
        var user = auth.currentUser;
        user.updateProfile({ displayName: newUser.name});
        console.log(auth.currentUser);
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
    firestore.collection('users').doc(user.uid).update({
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
