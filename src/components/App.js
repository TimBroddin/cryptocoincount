import React, { Component } from "react";

import { Provider } from "react-redux";
import localForage from "localforage";
import createCompressor from "redux-persist-transform-compress";
import { Router } from "react-router-dom";
import { persistStore } from "redux-persist";

import Layout from "./Layout";
import Auth from '../Auth';
import history from '../history';
import store from '../store';

const compressor = createCompressor();

const auth = new Auth(store);

history.listen((location, action) => {
  if (window.ga) {
    setTimeout(() => {
      window.ga("gtm1.set", "location", window.location.href);
      window.ga("gtm1.set", "page", location.pathname);
      window.ga("gtm1.send", "pageview", location.pathname);
    }, 500);
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    };
  }

  componentWillMount() {
    persistStore(
      store,
      {
        storage: localForage,
        blacklist: ["sync", "navigation", "history", "export", "import"],
        transforms: [compressor]
      },
      () => {
        this.setState({ rehydrated: true });
      }
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
           {(this.state.rehydrated) ? <Layout auth={auth} loading={!this.state.rehydrated} /> : <div /> }
        </Router>
      </Provider>
    );
  }
}

export default App;
