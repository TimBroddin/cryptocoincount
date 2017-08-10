const history = (state = { loading: false, data: {}}, action) => {
  switch (action.type) {
    case 'SET_HISTORY_LOADING':
    return {
      data: state.data,
      loading: action.value
    }
    case 'SET_HISTORY':
      return {
        data: action.data,
        loading: false
      }

    default:
      return state;
  }
};

export default history;
