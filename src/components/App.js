import React, { Component } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import localForage from "localforage";
import createCompressor from "redux-persist-transform-compress";

import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import { persistStore, autoRehydrate } from "redux-persist";

import thunk from "redux-thunk";
import reducers from "../reducers";

import Layout from "./Layout";

function configureStore(initialState, reducer) {
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(thunk),
      autoRehydrate(),
      typeof window === "object" &&
      typeof window.devToolsExtension !== "undefined"
        ? window.devToolsExtension()
        : f => f
    )
  );
  return store;
}

const store = configureStore({}, reducers);
const compressor = createCompressor();

const history = createHistory();
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
        blacklist: ["sync", "navigation", "history"],
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
          <Layout ready={this.state.rehydrated} />
        </Router>
      </Provider>
    );
  }
}

export default App;
