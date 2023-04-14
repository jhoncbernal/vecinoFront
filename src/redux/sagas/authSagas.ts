// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/authTypes";
import {
  onSignInReceive,
  onLoadingAuth,
  onRecoverReceive
} from "../actions/authActions";
import { recover, signIn, signUp } from "../../services/auth";
import { onGetUserReceive } from "../actions/userActions";
// Services
function* fetchOnSignIn({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAuth("signIn", true));
    const { data, status } = yield call(signIn, payload);
    if (status === 200) {
      yield put(onSignInReceive(data));
      yield put(onGetUserReceive(data?.user));
    } else {
      console.error("OnSignIn info failed");
    }
    yield put(onLoadingAuth("signIn", false));
  } catch (e) {
    console.error(`OnSignIn info Error: ${e}`);
    yield put(onLoadingAuth("signIn", false));
  }
}

function* fetchOnSignUp({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAuth("signUp", true));
    const { data, status } = yield call(signUp, payload);
    if (status === 200) {
      yield put(onGetUserReceive(data));
    } else {
      console.error("OnSignUp info failed");
    }
    yield put(onLoadingAuth("signUp", false));
  } catch (e) {
    console.error(`OnSignUp info Error: ${e}`);
    yield put(onLoadingAuth("signUp", false));
  }
}

function* fetchOnRecover({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAuth("recover", true));
    const { data, status } = yield call(recover, payload);
    if (status === 200) {
      yield put(onRecoverReceive(data));
    } else {
      console.error("OnRecovery info failed");
    }
    yield put(onLoadingAuth("recover", false));
  } catch (e) {
    console.error(`OnRecovery info Error: ${e}`);
    yield put(onLoadingAuth("recover", false));
  }
}

export default [
  takeLatest(Types.ON_SIGN_IN, fetchOnSignIn),
  takeLatest(Types.ON_SIGN_UP, fetchOnSignUp),
  takeLatest(Types.ON_RECOVER, fetchOnRecover),
];
