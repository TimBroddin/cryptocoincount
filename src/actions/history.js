import { SET_HISTORY_LOADING, SET_HISTORY } from './constants';
import config from '../config';

const setHistoryLoading = value => {
  return {
    type: SET_HISTORY_LOADING,
    value
  };
};

const setHistory = data => {
  return {
    type: SET_HISTORY,
    data
  };
};

const fetchHistory = () => {
  return (dispatch, getState) => {
    const { currency, coins } = getState();
    dispatch(setHistoryLoading(true));
    if (coins && coins.length) {
      fetch(
        `${config.api_base}previous?coins=${coins
          .map(c => c.id)
          .join(",")}&convert=${currency}`
      )
        .then(res => res.json())
        .then(data => {
          dispatch(setHistory(data));
        })
        .catch(err => {
          dispatch(setHistoryLoading(false));
        });
    }
  };
};

export { fetchHistory }
