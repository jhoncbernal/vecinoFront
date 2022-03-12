// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/loginTypes";
import {
  onLoginReceive,
  onLoadingLogin
} from "../actions/loginActions";
import { login } from "../../services/login";
// Services

function* fetchLogin({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingLogin("login", true));
    const { data } = yield call(login, payload);
    yield put(onLoginReceive(data.token));
    yield put(onLoadingLogin("login", false));
  } catch (e) {
    console.error(`Error login: ${e}`);
    yield put(onLoadingLogin("login", false));
  }
}

export default [
  takeLatest(Types.ON_LOGIN, fetchLogin)
];
