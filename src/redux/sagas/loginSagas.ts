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
    console.log("payload", payload);
    yield put(onLoadingLogin("login", true));
    const { data, status } = yield call(login, payload);
    if (status === 200) {
      yield put(onLoginReceive(data));
    } else {
      console.error("login info failed");
    }
    yield put(onLoadingLogin("login", false));
  } catch (e) {
    console.error(`login info Error: ${e}`);
    yield put(onLoadingLogin("login", false));
  }
}


export default [
  takeLatest(Types.ON_LOGIN, fetchLogin)
];
