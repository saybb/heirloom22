const initState = {
    isAuthenticated: false,
    user: null,
    errMess: null
}


export const Auth = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...state, 
                isAuthenticated: true,
                errMess: '',
                user: action.user
            };
        
        case 'LOGIN_ERROR':
            return {...state,
                isAuthenticated: false,
                errMess: action.err.message
            };    
        
        case 'SIGNUP_SUCCESS':
            return {...state, 
                isAuthenticated: true,
                errMess: '',
                user: action.user
            };
        
        case 'SIGNUP_ERROR':
            return {
                ...state,
                isAuthenticated: false,
                errMess: action.err.message
            };
        
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        
        default:
            return state
    }
}