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

      default:
        return state;
    }
};



export default artefactReducer;