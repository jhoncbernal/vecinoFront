import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
// Sagas
import userSagas from "./sagas/providerSagas";


// Add Sagas
function* rootSaga() {
  yield all([...userSagas]);
}

// config
const rootReducer = persistCombineReducers(
  {
    key: "root-name",
    storage,
    whitelist: [""], // only todo reducer will be persisted
  },
  reducers
);

// middlewares
const middlewares: Array<any> = [];
const sagaMiddleware = createSagaMiddleware();

// devtools
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// enhancers
const enhancers = composeEnhancers(
 // applyMiddleware(thunk),
  applyMiddleware(...middlewares, sagaMiddleware)
  // other store enhancers if any
);

// store
const store = createStore(rootReducer, enhancers);

// persistor
const persistor = persistStore(store);

// Run saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export { persistor };

export default store;
