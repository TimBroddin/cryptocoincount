import { SET_CLOUD_CONFLICT } from './constants';
import { doImport } from './sync';
import { bumpVersion } from './version';

import config from "../config";
import Auth from "../Auth";

const auth = new Auth();

const setCloudConflict = (value) => {
  return {
    type: SET_CLOUD_CONFLICT,
    value
  }
}

/* Load / save data */
const loadUserData = (skipVersionCheck=false) => {
  return (dispatch, getState) => {
    if (auth.isAuthenticated()) {
      const { getAccessToken } = auth;
      const { version } = getState();

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${getAccessToken()}`);

      fetch(`${config.api_base}secure/load`, { headers })
        .then(res => res.json())
        .then(data => {
          if (data) {
            console.log(data.version, version);
            if(data.version && data.version < version && !skipVersionCheck) {
              dispatch(setCloudConflict(true));
            } else {
              dispatch(setCloudConflict(false));
              dispatch(doImport(data));
              dispatch(bumpVersion());
              dispatch(saveUserData());
            }
          } else {
            // no data, create user Profile
            dispatch(saveUserData());
          }
        }).catch(err => {});

    }
  };
};

const saveUserData = () => {
  return (dispatch, getState) => {
    if (auth.isAuthenticated()) {
      const { getAccessToken } = auth;
      const { coins, watchlist, currency, version } = getState();

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${getAccessToken()}`);

      const body = new URLSearchParams();
      body.append("data", JSON.stringify({ coins, watchlist, currency, version }));

      fetch(`${config.api_base}secure/save`, { headers, body, method: "POST" })
        .then(res => res.json())
        .then(data => {
          dispatch(setCloudConflict(false));
        })
        .catch(err => {});
    }
  };
};

export { loadUserData, saveUserData };
