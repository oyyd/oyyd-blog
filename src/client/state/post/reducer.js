const initialPost = {
  title: null,
  fileName: null,
  htmlContent: null,
};

function reducer(state = initialPost, action) {
  switch (action.type){
    case 'POST_INIT':
      return {
        title: action.title,
        fileName: action.fileName,
        htmlContent: action.htmlContent,
      };
    default:
      return state;
  };
}

export default reducer;
