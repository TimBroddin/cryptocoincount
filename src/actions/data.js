import { SET_DATA, SET_DATA_LOADING } from "./constants";
import { fetchHistory } from "./history";
import config from "../config";

const setData = data => {
  return {
    type: SET_DATA,
    data
  };
};

const setDataLoading = value => {
  return {
    type: SET_DATA_LOADING,
    value
  };
};

const fetchData = () => {
  return (dispatch, getState) => {
    const { currency } = getState();

    dispatch(setDataLoading(true));
    fetch(`${config.api_base}ticker/?convert=${currency}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setData(data));
        dispatch(fetchHistory());
      })
      .catch(err => {
        dispatch(setDataLoading(false));
      });
  };
};

export { fetchData };
