import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import thunk from 'redux-thunk';
import reducers from '../reducers';

import MainContainer from './MainContainer';

const { Header, Content, Footer } = Layout;


function configureStore(initialState, reducer) {
  const store = createStore(reducer, undefined, compose(applyMiddleware(thunk), autoRehydrate(), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f));
  return store;
}

const store = configureStore({}, reducers);
persistStore(store)


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount(){
    persistStore(store, {  }, () => {
      this.setState({ rehydrated: true });
    });
}

  render() {
    return (
      <Provider store={store}>
        {this.state.rehydrated ? <MainContainer /> : <div />}
    </Provider>
    );
  }
}

export default App;
