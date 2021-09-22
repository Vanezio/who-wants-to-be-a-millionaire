const questionsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    default:
      return state;
  }
};

export default questionsReducer;
