import auth0 from 'auth0-js';
import history from './history';
import config from './config';
import { loadUserData } from './actions';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'cryptocoincount.auth0.com',
    clientID: 'hjg6LjUvVfJodlRTIGFH7QYMPC211xmo',
    redirectUri: config.authUrl,
    audience: 'https://cryptocoincount.com/api',
    responseType: 'token id_token',
    scope: 'openid read:portfolio save:portfolio offline_access'
  });

  constructor(store) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.store = store;
  }


  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.loadData();
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  loadData() {
    if(this.store) {
      this.store.dispatch(loadUserData());
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    if(typeof localStorage !== "undefined") {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    } else {
      return false;
    }
  }
}
