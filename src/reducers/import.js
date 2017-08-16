import {
  SET_IMPORT_LOADING,
  SET_IMPORT_ERROR,
  SET_IMPORT_SUCCESS
} from "../actions/constants";

const importReducer = (
  state = { loading: false, error: null, success: null },
  action
) => {
  switch (action.type) {
    case SET_IMPORT_LOADING:
      return {
        ...state,
        loading: action.value
      };
    case SET_IMPORT_ERROR:
      return {
        ...state,
        error: action.value
      };
    case SET_IMPORT_SUCCESS:
      return {
        ...state,
        success: action.value
      };
    default:
      return state;
  }
};

export default importReducer;
