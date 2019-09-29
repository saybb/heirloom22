const initState = {
  isLoading: true,
  errMess: null,
  objs: [],
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    
      case 'CREATE_SUCCESS':
        console.log('create success');
        return state;

      case 'CREATE_ERROR':
          console.log('create error');
          return {
            ...state,
            errMess: 'Create failed'
          }
      
      case 'EDIT_SUCCESS':
          console.log('edit success');
          return state;
  
      case 'EDIT_ERROR':
          console.log('edit error');
          return {
            ...state,
            errMess: 'Edit failed'
          }
      
      case 'DELETE_SUCCESS':
          console.log('delete success');
          return state;
      
      case 'DELETE_ERROR':
          console.log('delete error');
          return {
            ...state,
            errMess: 'Delete failed'
          }

      default:
        return state;
    }
};



export default userReducer;