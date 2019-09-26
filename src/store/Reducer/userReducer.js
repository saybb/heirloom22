const initState = {
    authError: null
  }
  
  const userReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        console.log('login error');
        return {
          ...state,
          authError: 'Login failed'
        }
  
      case 'LOGIN_SUCCESS':
        console.log('login success');
        return {
          ...state,
          authError: null
        }
  
      case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return state;
  
      case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return {
          ...state,
          authError: null
        }
  
      case 'SIGNUP_ERROR':
        console.log('signup error')
        return {
          ...state,
          authError: action.err.message
        }

      case 'PROFILE_UPDATE_SUCCESS':
        console.log('profile update success')
        return {
          ...state,
          authError: null
        }

      case 'PROFILE_UPDATE_ERROR':
        console.log('profile update error')
        return {
          ...state,
          authError: 'Profile update failed'
        }
  
      default:
        return state
    }
  };
  
  export default userReducer;