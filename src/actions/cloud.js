import { doImport } from './sync';
import config from "../config";
import Auth from "../Auth";

const auth = new Auth();


/* Load / save data */
const loadUserData = () => {
  return (dispatch, getState) => {
    if (auth.isAuthenticated()) {
      const { getAccessToken } = auth;
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${getAccessToken()}`);

      fetch(`${config.api_base}secure/load`, { headers })
        .then(res => res.json())
        .then(data => {
          if (data) {
            dispatch(doImport(data));
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
      const { coins, watchlist, currency } = getState();

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${getAccessToken()}`);

      const body = new URLSearchParams();
      body.append("data", JSON.stringify({ coins, watchlist, currency }));

      fetch(`${config.api_base}secure/save`, { headers, body, method: "POST" })
        .then(res => res.json())
        .then(data => {})
        .catch(err => {});
    }
  };
};

export { loadUserData, saveUserData };
