// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/cityTypes";

import {
  onGetCityReceive,
  onGetAllCitiesReceive,
  onLoadingCity,
  onGetAllCities,
} from "../actions/cityActions";

import { getCity, getAllCitiesByProperty } from "../../services/city";

function* fetchCity({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingCity("city", true));
    const { data, status } = yield call(getCity, payload);
    if (status === 200) {
      yield put(onGetCityReceive(data));
    } else {
      console.error("fetchCity info failed");
    }
    yield put(onLoadingCity("city", false));
  } catch (e) {
    console.error(`fetchCity info Error: ${e}`);
    yield put(onLoadingCity("city", false));
  }
}

function* fetchAllCities({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingCity("cityList", true));
    const { data, status } = yield call(getAllCitiesByProperty, payload);
    if (status === 200) {
      yield put(onGetAllCitiesReceive(data));
    } else {
      console.error("AllCities info failed");
    }
    yield put(onLoadingCity("cityList", false));
  } catch (e) {
    console.error(`AllCities info Error: ${e}`);
    yield put(onLoadingCity("cityList", false));
  }
}

function* fetchAddCity({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingCity("cityList", true));
    const { data, status } = yield call(getAllCitiesByProperty, payload);
    if (status === 200) {
      yield put(onGetAllCitiesReceive(data));
    } else {
      console.error("AllCities info failed");
    }
    yield put(onLoadingCity("cityList", false));
  } catch (e) {
    console.error(`AllCities info Error: ${e}`);
    yield put(onLoadingCity("cityList", false));
  }
}

function* fetchUpdateCity({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingCity("cityList", true));
    const { data, status } = yield call(getAllCitiesByProperty, payload);
    if (status === 200) {
      yield put(onGetAllCitiesReceive(data));
    } else {
      console.error("AllCities info failed");
    }
    yield put(onLoadingCity("cityList", false));
  } catch (e) {
    console.error(`AllCities info Error: ${e}`);
    yield put(onLoadingCity("cityList", false));
  }
}

function* fetchDeleteCity({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingCity("cityList", true));
    const { data, status } = yield call(getAllCitiesByProperty, payload);
    if (status === 200) {
      yield put(onGetAllCitiesReceive(data));
    } else {
      console.error("AllCities info failed");
    }
    yield put(onLoadingCity("cityList", false));
  } catch (e) {
    console.error(`AllCities info Error: ${e}`);
    yield put(onLoadingCity("cityList", false));
  }
}

export default [
  takeLatest(Types.GET_CITY, fetchCity),
  takeLatest(Types.GET_CITIES_ALL, fetchAllCities),
  takeLatest(Types.ADD_CITY, fetchAddCity),
  takeLatest(Types.UPDATE_CITY, fetchUpdateCity),
  takeLatest(Types.DELETE_CITY, fetchDeleteCity),
];
