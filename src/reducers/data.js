import { SET_DATA_LOADING, SET_DATA } from "../actions/constants";

const data = (state = { loading: false, data: [] }, action) => {
  switch (action.type) {
    case SET_DATA_LOADING:
      return {
        data: state.data,
        loading: action.value
      };
    case SET_DATA:
      return {
        data: action.data,
        loading: false
      };

    default:
      return state;
  }
};

export default data;
