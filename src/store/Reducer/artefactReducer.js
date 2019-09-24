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
        console.log('create artefact error');
        return state;
    
      case 'FETCH_ARTEFACTS_SUCCESS':
        console.log('fetch artefacts success');
        return {...state, isLoading: false, errMess: null, artefacts: action.payload};
      
      case 'ARTEFACTS_LOADING':
        console.log('artefacts are loading');
        return {...state, isLoading: true, errMess: null, artefacts: []}

      case 'FETCH_ARTEFACTS_ERROR':
        console.log('fetch artefacts error');
        return {...state, isLoading: false, errMess: action.payload, artefacts: []};

      default:
        return state;
    }
};



export default artefactReducer;