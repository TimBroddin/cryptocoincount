import {
  SET_CURRENCY,
  ADD_COIN,
  REMOVE_COIN,
  CHANGE_COIN_AMOUNT,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  BUMP_VERSION
} from "../actions/constants";

const d = 0;

const version = (state = d, action) => {
  switch (action.type) {
    case SET_CURRENCY:
    case ADD_COIN:
    case REMOVE_COIN:
    case CHANGE_COIN_AMOUNT:
    case ADD_TO_WATCHLIST:
    case REMOVE_FROM_WATCHLIST:
    case BUMP_VERSION:
      return new Date().getTime();
    default:
      return state;
  }
};

export default version;
