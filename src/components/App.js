import React, { PureComponent } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import localForage from 'localforage';
import createCompressor from 'redux-persist-transform-compress';

import { persistStore, autoRehydrate } from 'redux-persist';

import thunk from 'redux-thunk';
import reducers from '../reducers';

import Layout from './Layout';


function configureStore(initialState, reducer) {
  const store = createStore(reducer, undefined, compose(applyMiddleware(thunk), autoRehydrate(), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f));
  return store;
}

const store = configureStore({}, reducers);
const compressor = createCompressor();


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount(){
    persistStore(store, {storage: localForage, blacklist: ['sync', 'navigation', 'history'],  transforms: [compressor]} , () => {
      this.setState({ rehydrated: true });
    });
}

  render() {
    return (
      <Provider store={store}>
        {this.state.rehydrated ? <Layout /> : <div />}
    </Provider>
    );
  }
}

export default App;
