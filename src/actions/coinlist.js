import { ADD_COIN, REMOVE_COIN, CHANGE_COIN_AMOUNT } from "./constants";
import { fetchHistory } from "./history";
import { saveUserData } from "./cloud";

const addCoinAction = (coin, amount) => {
  return {
    type: ADD_COIN,
    coin,
    amount
  };
};

const addCoin = (coin, amount) => {
  return dispatch => {
    dispatch(addCoinAction(coin, amount));
    dispatch(fetchHistory());
    dispatch(saveUserData());
  };
};

const removeCoin = coin => {
  return dispatch => {
    dispatch({
      type: REMOVE_COIN,
      coin
    });
    dispatch(saveUserData());
  };
};

const changeCoinAmount = (coin, amount) => {
  return dispatch => {
    dispatch({
      type: CHANGE_COIN_AMOUNT,
      coin,
      amount
    });
    dispatch(saveUserData());
  };
};

export { addCoin, removeCoin, changeCoinAmount };
