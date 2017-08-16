import { SET_CLOUD_CONFLICT } from '../actions/constants';

const cloud = (state = { conflict: false }, action) => {
  switch (action.type) {
    case SET_CLOUD_CONFLICT:
      return {
        ...state,
        conflict: action.value
      }
    default:
      return state;
  }
};

export default cloud;
