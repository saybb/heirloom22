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
        return firestore.collection('users').doc(resp.user.uid).set({
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email,
                  location: '',
                  bio: '',
        }).then(() => {
          var user = auth.currentUser;
          user.updateProfile({ displayName: newUser.firstName});
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
      firestore.collection('users').doc(user.uid).set({
              firstName: info.firstName,
              lastName: info.lastName,
              location: info.location,
              bio: info.bio,
      }).then(() => {
        dispatch({ type: 'PROFILE_UPDATE_SUCCESS'});
      }).catch((err) => {
        dispatch({ type: 'PROFILE_UPDATE_ERROR'});
      });
    }
  }