// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import * as Types from "../types/providerTypes";
import {
  onLoginReceive,
  onLoadingLogin,
  onGetProviderInfoReceive,
  onGetProviderInfo,
} from "../actions/providerActions";
import { login } from "../../services/provider";
// Services

function* fetchLogin({ payload }:any): SagaIterator {
  try {
    yield put(onLoadingLogin("login", true));
    const {data} = yield call(login, payload);
    console.log(data.user);
    yield put(onLoginReceive(data.token));
    yield put(onGetProviderInfoReceive( data.user));
    yield put(onLoadingLogin("login", false));
  } catch (e) {
    console.error(`Error login: ${e}`);
    yield put(onLoadingLogin("login", false));
  }
}

/* function* fetchProviderInfo(): SagaIterator {
  try {
     const { data } = yield call(axios.gatewayModule.login);

    if (data) {
      yield put(onGetProviderInfoReceive(data));
    } else {
      console.error("provider info failed");
    } 
  } catch (e) {
    console.error(`provider info Error: ${e}`);
  }
} */

export default [
  takeLatest(Types.ON_LOGIN, fetchLogin),
  //takeLatest(Types.GET_PROVIDER_INFO, fetchProviderInfo),
];
