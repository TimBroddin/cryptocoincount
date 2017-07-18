const data = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.data;
    default:
      return state;
  }
};

export default data;
