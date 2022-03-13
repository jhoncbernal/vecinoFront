// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/adminTypes";
import {
  onGetAllAdminsRecive,
  onGetAdminRecive,
  onGetAdminNamesRecive,
  onLoadingAdmin,
  onGetAllAdmins,
} from "../actions/adminActions";
import {
  deleteAdmin,
  getAllAdmins,
  getAdmin,
  getAdminsNames,
  updateAdmin,
  addAdmin,
} from "../../services/admin";
// Services

function* fetchAdmin({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAdmin("admin", true));
    const { data, status } = yield call(getAdmin, payload);
    if (status === 200) {
      yield put(onGetAdminRecive(data));
    } else {
      console.error("fetchAdmin info failed");
    }
    yield put(onLoadingAdmin("admin", false));
  } catch (e) {
    console.error(`fetchAdmin info Error: ${e}`);
    yield put(onLoadingAdmin("admin", false));
  }
}

function* fetchAllAdmins(): SagaIterator {
  try {
    yield put(onLoadingAdmin("adminList", true));
    const { data, status } = yield call(getAllAdmins);
    if (status === 200) {
      yield put(onGetAllAdminsRecive(data));
    } else {
      console.error("AllAdmins info failed");
    }
    yield put(onLoadingAdmin("adminList", false));
  } catch (e) {
    console.error(`AllAdmins info Error: ${e}`);
    yield put(onLoadingAdmin("adminList", false));
  }
}

function* fetchAdminsByPoints(): SagaIterator {
  try {
    yield put(onLoadingAdmin("adminListBestPoints", true));
    const { data, status } = yield call(getAdminsNames);
    if (status === 200) {
      yield put(onGetAdminNamesRecive(data));
    } else {
      console.error("AdminsByPoints info failed");
    }
    yield put(onLoadingAdmin("adminListBestPoints", false));
  } catch (e) {
    console.error(`AdminsByPoints info Error: ${e}`);
    yield put(onLoadingAdmin("adminListBestPoints", false));
  }
}

function* fetchAddAdmin({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAdmin("admin", true));
    const {  status } = yield call(addAdmin, payload);
    if (status === 200) {
      yield put(onGetAllAdmins());
    } else {
      console.error("AddAdmin info failed");
    }
    yield put(onLoadingAdmin("admin", false));
  } catch (e) {
    console.error(`AddAdmin info Error: ${e}`);
    yield put(onLoadingAdmin("admin", false));
  }
}

function* fetchUpdateAdmin({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAdmin("admin", true));
    const { data, status } = yield call(updateAdmin, payload);
    if (status === 200) {
      yield put(onGetAdminRecive(data));
    } else {
      console.error("UpdateAdmin info failed");
    }
    yield put(onLoadingAdmin("admin", false));
  } catch (e) {
    console.error(`UpdateAdmin info Error: ${e}`);
    yield put(onLoadingAdmin("admin", false));
  }
}

function* fetchDeleteAdmin({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingAdmin("admin", true));
    const { status } = yield call(deleteAdmin, payload);
    if (status !== 200) {
      console.error("DeleteAdmin info failed");
    }
    yield put(onLoadingAdmin("admin", false));
  } catch (e) {
    console.error(`DeleteAdmin info Error: ${e}`);
    yield put(onLoadingAdmin("admin", false));
  }
}

export default [
  takeLatest(Types.GET_ADMIN, fetchAdmin),
  takeLatest(Types.GET_ADMIN_ALL, fetchAllAdmins),
  takeLatest(Types.GET_ADMIN_BY_NAMES, fetchAdminsByPoints),
  takeLatest(Types.ADD_ADMIN, fetchAddAdmin),
  takeLatest(Types.UPDATE_ADMIN, fetchUpdateAdmin),
  takeLatest(Types.DELETE_ADMIN, fetchDeleteAdmin),
];
