// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/authTypes";
import {
  onAuthReceive,
  onLoadingAuth
} from "../actions/authActions";
import { auth } from "../../services/auth";
import { onGetUserRecive } from "../actions/userActions";
// Services
function* fetchAuth({ payload }: any): SagaIterator {
  try {
    console.log("payload", payload);
    yield put(onLoadingAuth("auth", true));
    const { data, status } = yield call(auth, payload);
    if (status === 200) {
      yield put(onAuthReceive(data));
      yield put(onGetUserRecive(data?.user));
    } else {
      console.error("auth info failed");
    }
    yield put(onLoadingAuth("auth", false));
  } catch (e) {
    console.error(`auth info Error: ${e}`);
    yield put(onLoadingAuth("auth", false));
  }
}


export default [
  takeLatest(Types.ON_AUTH, fetchAuth)
];
