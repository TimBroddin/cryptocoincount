import { createStore, applyMiddleware, compose } from "redux";
import { autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import reducers from "../reducers";

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

export default store;
