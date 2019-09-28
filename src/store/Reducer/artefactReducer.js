const initState = {
  isLoading: true,
  errMess: null,
  artefacts: [],
}

const artefactReducer = (state = initState, action) => {
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
      
      default:
        return state;
    }
};



export default artefactReducer;