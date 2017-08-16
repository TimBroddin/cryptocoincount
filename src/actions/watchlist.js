import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from "./constants";
import { saveUserData } from "./cloud";

const addToWatchList = coin => {
  return dispatch => {
    dispatch({
      type: ADD_TO_WATCHLIST,
      coin
    });
    dispatch(saveUserData());
  };
};

const removeFromWatchList = coin => {
  return dispatch => {
    dispatch({
      type: REMOVE_FROM_WATCHLIST,
      coin
    });
    dispatch(saveUserData());
  };
};

export { addToWatchList, removeFromWatchList };
