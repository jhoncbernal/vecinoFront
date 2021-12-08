import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

/* import providerRegisterReducers from "./reducers/providerRegisterReducers";
import providerRegisterSagas from "./sagas/providerRegisterSagas"; 
// Add Reducers
const reducers = {
  providers: providerRegisterReducers,
};

// Add Sagas
function* rootSaga() {
  yield all([...providerRegisterSagas]);
}

// config
const rootReducer = combineReducers(reducers);
*/