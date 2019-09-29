const initState = {
  isLoading: true,
  errMess: null,
  artefacts: [],
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    
      case 'CREATE_ARTEFACT_SUCCESS':
        console.log('create artefact success');
        return state;

      case 'CREATE_ARTEFACT_ERROR':
          console.log('create error');
          return {
            ...state,
            errMess: 'Create failed'
          }
      
      case 'EDIT_ARTEFACT_SUCCESS':
          console.log('edit artefact success');
          return state;
  
      case 'EDIT_ARTEFACT_ERROR':
          console.log('edit error');
          return {
            ...state,
            errMess: 'Edit failed'
          }
      
      case 'DELETE_ARTEFACT_SUCCESS':
          console.log('delete artefact success');
          return state;
      
      case 'DELETE_ARTEFACT_ERROR':
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