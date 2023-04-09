// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/userTypes";
import {
  onGetAllUsersReceive,
  onGetUserReceive,
  onGetUsersByPointsReceive,

  onLoadingUser,
} from "../actions/userActions";
import {
    deleteUser,
  getAllUsers,
  getUser,
  getUsersByPoints,
  updateUser,
} from "../../services/user";
// Services

function* fetchUser({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingUser("user", true));
    const { data, status } = yield call(getUser, payload);
    if (status === 200) {
      yield put(onGetUserReceive(data));
    } else {
      console.error("user info failed");
    }
    yield put(onLoadingUser("user", false));
  } catch (e) {
    console.error(`user info Error: ${e}`);
    yield put(onLoadingUser("user", false));
  }
}

function* fetchAllUsers(): SagaIterator {
  try {
    yield put(onLoadingUser("userList", true));
    const { data, status } = yield call(getAllUsers);
    if (status === 200) {
      yield put(onGetAllUsersReceive(data));
    } else {
      console.error("AllUsers info failed");
    }
    yield put(onLoadingUser("userList", false));
  } catch (e) {
    console.error(`AllUsers info Error: ${e}`);
    yield put(onLoadingUser("userList", false));
  }
}

function* fetchUsersByPoints(): SagaIterator {
  try {
    yield put(onLoadingUser("userListBestPoints", true));
    const { data, status } = yield call(getUsersByPoints);
    if (status === 200) {
      yield put(onGetUsersByPointsReceive(data));
    } else {
      console.error("UsersByPoints info failed");
    }
    yield put(onLoadingUser("userListBestPoints", false));
  } catch (e) {
    console.error(`UsersByPoints info Error: ${e}`);
    yield put(onLoadingUser("userListBestPoints", false));
  }
}

function* fetchUpdateUser({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingUser("user", true));
    const { data, status } = yield call(updateUser, payload);
    if (status === 200) {
      yield put(onGetUserReceive(data));
    } else {
      console.error("UpdateUser info failed");
    }
    yield put(onLoadingUser("user", false));
  } catch (e) {
    console.error(`UpdateUser info Error: ${e}`);
    yield put(onLoadingUser("user", false));
  }
}

function* fetchDeleteUser({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingUser("user", true));
    const { status } = yield call(deleteUser, payload);
    if (status !== 200) {
      console.error("DeleteUser info failed");
    }
    yield put(onLoadingUser("user", false));
  } catch (e) {
    console.error(`DeleteUser info Error: ${e}`);
    yield put(onLoadingUser("user", false));
  }
}

export default [
  takeLatest(Types.GET_USER, fetchUser),
  takeLatest(Types.GET_USER_ALL, fetchAllUsers),
  takeLatest(Types.GET_USER_BY_POINTS, fetchUsersByPoints),
  takeLatest(Types.UPDATE_USER, fetchUpdateUser),
  takeLatest(Types.DELETE_USER, fetchDeleteUser),
];
