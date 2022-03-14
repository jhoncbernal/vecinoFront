// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/billTypes";
import {
  onGetBillRecive,
  onGetAllBillsRecive,
  onLoadingBill,
} from "../actions/billActions";
// Services
import {
  deleteBill,
  addBill,
  getAllBillsByProvider,
  getBill,
  getAllBillsByUser,
  updateBill,
} from "../../services/bill";

function* fetchBill({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingBill("bill", true));
    const { data, status } = yield call(getBill, payload);
    if (status === 200) {
      yield put(onGetBillRecive(data));
    } else {
      console.error("bill info failed");
    }
    yield put(onLoadingBill("bill", false));
  } catch (e) {
    console.error(`bill info Error: ${e}`);
    yield put(onLoadingBill("bill", false));
  }
}

function* fetchBillsByUser(): SagaIterator {
  try {
    yield put(onLoadingBill("billList", true));
    const { data, status } = yield call(getAllBillsByUser);
    if (status === 200) {
      yield put(onGetAllBillsRecive(data));
    } else {
      console.error("BillsByUser info failed");
    }
    yield put(onLoadingBill("billList", false));
  } catch (e) {
    console.error(`BillsByUser info Error: ${e}`);
    yield put(onLoadingBill("billList", false));
  }
}

function* fetchBillsByProvider(): SagaIterator {
  try {
    yield put(onLoadingBill("billList", true));
    const { data, status } = yield call(getAllBillsByProvider);
    if (status === 200) {
      yield put(onGetAllBillsRecive(data));
    } else {
      console.error("BillsByProvider info failed");
    }
    yield put(onLoadingBill("billList", false));
  } catch (e) {
    console.error(`BillsByProvider info Error: ${e}`);
    yield put(onLoadingBill("billList", false));
  }
}

function* fetchAddBill({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingBill("bill", true));
    const { data, status } = yield call(addBill, payload);
    if (status === 200) {
      yield put(onGetBillRecive(data));
    } else {
      console.error("addBill info failed");
    }
    yield put(onLoadingBill("bill", false));
  } catch (e) {
    console.error(`addBill info Error: ${e}`);
    yield put(onLoadingBill("bill", false));
  }
}

function* fetchUpdateBill({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingBill("bill", true));
    const { data, status } = yield call(updateBill, payload);
    if (status === 200) {
      yield put(onGetBillRecive(data));
    } else {
      console.error("UpdateBill info failed");
    }
    yield put(onLoadingBill("bill", false));
  } catch (e) {
    console.error(`UpdateBill info Error: ${e}`);
    yield put(onLoadingBill("bill", false));
  }
}

function* fetchDeleteBill({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingBill("bill", true));
    const { status } = yield call(deleteBill, payload);
    if (status !== 200) {
      console.error("DeleteBill info failed");
    }
    yield put(onLoadingBill("bill", false));
  } catch (e) {
    console.error(`DeleteBill info Error: ${e}`);
    yield put(onLoadingBill("bill", false));
  }
}

export default [
  takeLatest(Types.GET_BILL, fetchBill),
  takeLatest(Types.GET_BILLS_BY_USER, fetchBillsByUser),
  takeLatest(Types.GET_BILLS_BY_PROVIDER, fetchBillsByProvider),
  takeLatest(Types.ADD_BILL, fetchAddBill),
  takeLatest(Types.UPDATE_BILL, fetchUpdateBill),
  takeLatest(Types.DELETE_BILL, fetchDeleteBill),
];
