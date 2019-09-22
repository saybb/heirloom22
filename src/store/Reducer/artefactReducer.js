const initState = {}

const artefactReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ARTEFACT_SUCCESS':
      console.log('create artefact success');
      return state;
    case 'CREATE_ARTEFACT_ERROR':
      console.log('create artefact error');
      return state;
    default:
      return state;
  }
};

export default artefactReducer;