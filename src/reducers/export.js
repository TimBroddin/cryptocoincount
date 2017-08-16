import {
  SET_EXPORT_LOADING,
  SET_EXPORT_CODE,
  SET_EXPORT_ERROR
} from "../actions/constants";

const exportReducer = (
  state = { loading: false, code: null, error: null },
  action
) => {
  switch (action.type) {
    case SET_EXPORT_LOADING:
      return {
        ...state,
        loading: action.value
      };
    case SET_EXPORT_CODE:
      return {
        ...state,
        code: action.value
      };
    case SET_EXPORT_ERROR:
      return {
        ...state,
        error: action.value
      };

    default:
      return state;
  }
};

export default exportReducer;
