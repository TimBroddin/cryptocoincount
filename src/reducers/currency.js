const currency = (state = "USD", action) => {
  switch (action.type) {
    case "SET_CURRENCY":
      return action.currency;
    case "IMPORT":
      if (action.data && action.data.currency) {
        return action.data.currency;
      }
      return state;
    default:
      return state;
  }
};

export default currency;
