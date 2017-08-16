import { SET_EXPORT_LOADING, SET_EXPORT_ERROR, SET_EXPORT_CODE, IMPORT, SET_IMPORT_LOADING, SET_IMPORT_SUCCESS, SET_IMPORT_ERROR } from './constants';
import { fetchData } from './data';
import { saveUserData } from './cloud';
import config from '../config';

/* Export */
const exportData = () => {
  return (dispatch, getState) => {
    const { coins, watchlist, currency } = getState();
    const data = { coins, watchlist, currency };

    dispatch(setExportLoading(true));

    let body = new URLSearchParams();
    body.append("data", JSON.stringify(data));

    fetch(`${config.api_base}sync`, { method: "POST", body })
      .then(res => res.json())
      .then(data => {
        dispatch(setExportCode(data.code));
        dispatch(setExportLoading(false));
      })
      .catch(err => {
        dispatch(setExportError(err));
        dispatch(setExportLoading(false));
      });
  };
};

const setExportLoading = value => {
  return {
    type: SET_EXPORT_LOADING,
    value
  };
};

const setExportError = value => {
  return {
    type: SET_EXPORT_ERROR,
    value
  };
};

const setExportCode = value => {
  return {
    type: SET_EXPORT_CODE,
    value
  };
};

/* Import */
const doImport = data => {
  return dispatch => {
    dispatch({
      type: IMPORT,
      data
    });
    dispatch(fetchData());
  };
};

const importData = code => {
  return (dispatch, getState) => {
    dispatch(setImportLoading(true));

    fetch(`${config.api_base}sync/${code}`)
      .then(res => res.json())
      .then(data => {
        dispatch(doImport(data));
        dispatch(setImportLoading(false));
        dispatch(setImportSuccess(true));
        dispatch(saveUserData());
      })
      .catch(err => {
        dispatch(setImportError(err));
        dispatch(setImportLoading(false));
        dispatch(setImportSuccess(false));
      });
  };
};

const setImportLoading = value => {
  return {
    type: SET_IMPORT_LOADING,
    value
  };
};

const setImportSuccess = value => {
  return {
    type: SET_IMPORT_SUCCESS,
    value
  };
};

const setImportError = value => {
  return {
    type: SET_IMPORT_ERROR,
    value
  };
};

export { importData, exportData, doImport }
