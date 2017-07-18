const currency = (state = 'USD', action) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return action.currency;
    default:
      return state;
  }
};

export default currency;
