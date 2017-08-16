import { SET_CURRENCY } from './constants';
import { fetchData } from './data';
import { saveUserData } from './cloud';

const setCurrency = currency => {
  return dispatch => {
    dispatch({
      type: SET_CURRENCY,
      currency
    });

    dispatch(fetchData());
    dispatch(saveUserData());
  };
};

export { setCurrency };
