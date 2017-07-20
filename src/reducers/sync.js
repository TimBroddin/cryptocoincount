const sync = (state = { isScanning: false }, action) => {
  switch (action.type) {
    case 'SET_SCANNING':
      return Object.assign({}, state, {
        isScanning: action.scanning
      });
    default:
      return state;
  }
};

export default sync;
