const initState = {
  isLoading: true,
  errMess: null,
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    
      case 'CREATE_SUCCESS':
        console.log('create success');
        return {
          ...state,
          doc: action.doc,
        };
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
      
      case 'UPLOAD_SUCCESS':
        console.log('upload success');
        return {
          ...state,
          downloadURL: action.downloadURL,
        };

      case 'UPDATE_ERROR':
          console.log('update error');
          return {
            ...state,
            errMess: 'update failed'
          }
      
      case 'APPEND_SUCCESS':
          console.log('append success');
          return state;
      
      case 'APPEND_ERROR':
          console.log('append error');
          return {
            ...state,
            errMess: 'Append failed'
          }

      default:
        return state;
    }
};



export default userReducer;