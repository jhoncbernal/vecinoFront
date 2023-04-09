// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/packageTypes";
import {
  onGetPackageReceive,
  onGetAllPackagesReceive,
  onLoadingPackage,
  onGetPackageByPinReceive,
} from "../actions/packageActions";
// Services
import {
  deletePackage,
  addPackage,
  getAllPackagesByUser,
  getPackage,
  getPackageByPIN,
  updatePackage,
  getPackageByPackageCode,
} from "../../services/package";

function* fetchPackage({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingPackage("package", true));
    const { data, status } = yield call(getPackage, payload);
    if (status === 200) {
      yield put(onGetPackageReceive(data));
    } else {
      console.error("package info failed");
    }
    yield put(onLoadingPackage("package", false));
  } catch (e) {
    console.error(`package info Error: ${e}`);
    yield put(onLoadingPackage("package", false));
  }
}

function* fetchPackagesByUser({payload}: any): SagaIterator {
  try {
    yield put(onLoadingPackage("packageList", true));
    const { data, status } = yield call(getAllPackagesByUser,payload);
    if (status === 200) {
      yield put(onGetAllPackagesReceive(data));
    } else {
      console.error("PackagesByUser info failed");
    }
    yield put(onLoadingPackage("packageList", false));
  } catch (e) {
    console.error(`PackagesByUser info Error: ${e}`);
    yield put(onLoadingPackage("packageList", false));
  }
}

function* fetchPackageByPIN({ payload }: any): SagaIterator {
  try {
    console.log(payload);
    yield put(onLoadingPackage("packageList", true));
    const { data, status } = yield call(getPackageByPIN, payload);
    if (status === 200) {
      yield put(onGetPackageByPinReceive(data));
    } else {
      console.error("PackageByPIN, info failed");
    }
    yield put(onLoadingPackage("packageList", false));
  } catch (e) {
    console.error(`PackageByPIN, info Error: ${e}`);
    yield put(onLoadingPackage("packageList", false));
  }
}

function* fetchPackageByPackageCode({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingPackage("packageList", true));
    const { data, status } = yield call(getPackageByPackageCode, payload);
    if (status === 200) {
      yield put(onGetPackageReceive(data));
    } else {
      console.error("PackageByPackageCode, info failed");
    }
    yield put(onLoadingPackage("packageList", false));
  } catch (e) {
    console.error(`PackageByPackageCode, info Error: ${e}`);
    yield put(onLoadingPackage("packageList", false));
  }
}
function* fetchAddPackage({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingPackage("package", true));
    const { data, status } = yield call(addPackage, payload);
    if (status === 200) {
      yield put(onGetPackageReceive(data));
    } else {
      console.error("addPackage info failed");
    }
    yield put(onLoadingPackage("package", false));
  } catch (e) {
    console.error(`addPackage info Error: ${e}`);
    yield put(onLoadingPackage("package", false));
  }
}

function* fetchUpdatePackage({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingPackage("package", true));
    const { data, status } = yield call(updatePackage, payload);
    if (status === 200) {
      yield put(onGetPackageReceive(data));
    } else {
      console.error("updatePackage info failed");
    }
    yield put(onLoadingPackage("package", false));
  } catch (e) {
    console.error(`updatePackage info Error: ${e}`);
    yield put(onLoadingPackage("package", false));
  }
}

function* fetchDeletePackage({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingPackage("package", true));
    const { status } = yield call(deletePackage, payload);
    if (status !== 200) {
      console.error("deletePackage info failed");
    }
    yield put(onLoadingPackage("package", false));
  } catch (e) {
    console.error(`deletePackage info Error: ${e}`);
    yield put(onLoadingPackage("package", false));
  }
}

export default [
  takeLatest(Types.GET_PACKAGE, fetchPackage),
  takeLatest(Types.GET_PACKAGES_BY_USER, fetchPackagesByUser),
  takeLatest(Types.GET_PACKAGES_BY_PIN, fetchPackageByPIN),
  takeLatest(Types.GET_PACKAGES_BY_PACKAGE_CODE, fetchPackageByPackageCode),
  takeLatest(Types.ADD_PACKAGE, fetchAddPackage),
  takeLatest(Types.UPDATE_PACKAGE, fetchUpdatePackage),
  takeLatest(Types.DELETE_PACKAGE, fetchDeletePackage),
];
