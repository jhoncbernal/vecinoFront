// Libs
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
// Types
import Types from "../types/providerTypes";
import {
  onGetAllProvidersReceive,
  onGetProviderByCityReceive,
  onGetProviderCitiesReceive,
  onGetProviderReceive,
  onLoadingProvider,
} from "../actions/providerActions";
import {
  getAllProviders,
  getProvider,
  getProviderByCity,
  getProviderCities,
} from "../../services/provider";
// Services

function* fetchProvider({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingProvider("provider", true));
    const { data, status } = yield call(getProvider, payload);
    if (status === 200) {
      yield put(onGetProviderReceive(data));
    } else {
      console.error("provider info failed");
    }
    yield put(onLoadingProvider("provider", false));
  } catch (e) {
    console.error(`provider info Error: ${e}`);
    yield put(onLoadingProvider("provider", false));
  }
}

function* fetchAllProviders(): SagaIterator {
  try {
    yield put(onLoadingProvider("providerList", true));
    const { data, status } = yield call(getAllProviders);
    if (status === 200) {
      yield put(onGetAllProvidersReceive(data));
    } else {
      console.error("providerList info failed");
    }
    yield put(onLoadingProvider("providerList", false));
  } catch (e) {
    console.error(`providerList info Error: ${e}`);
    yield put(onLoadingProvider("providerList", false));
  }
}

function* fetchProviderCities(): SagaIterator {
  try {
    yield put(onLoadingProvider("cityList", true));
    const { data, status } = yield call(getProviderCities);
    if (status === 200) {
      yield put(onGetProviderCitiesReceive(data));
    } else {
      console.error("ProviderCities info failed");
    }
    yield put(onLoadingProvider("cityList", false));
  } catch (e) {
    console.error(`ProviderCities info Error: ${e}`);
    yield put(onLoadingProvider("ProviderCities", false));
  }
}

function* fetchProviderByCity({ payload }: any): SagaIterator {
  try {
    yield put(onLoadingProvider("providerListByCity", true));
    const { data, status } = yield call(getProviderByCity, payload);
    if (status === 200) {
      yield put(onGetProviderByCityReceive(data));
    } else {
      console.error("ProviderByCity info failed");
    }
    yield put(onLoadingProvider("providerListByCity", false));
  } catch (e) {
    console.error(`ProviderByCity info Error: ${e}`);
    yield put(onLoadingProvider("ProviderByCity", false));
  }
}


export default [
  takeLatest(Types.GET_PROVIDER, fetchProvider),
  takeLatest(Types.GET_PROVIDER_ALL, fetchAllProviders),
  takeLatest(Types.GET_PROVIDER_CITIES, fetchProviderCities),
  takeLatest(Types.GET_PROVIDER_BY_CITY, fetchProviderByCity),
];
