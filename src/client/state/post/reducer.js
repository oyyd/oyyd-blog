const initialPost = {
  title: 'test-title',
};

function reducer(state = initialPost, action) {
  switch (action.type){
    case 'UPDATE_TITLE':

      //TODO:
      return state;
    default:
      return state;
  };
}

export default reducer;
