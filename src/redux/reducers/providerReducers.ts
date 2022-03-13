import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/providerTypes";

export type state = {
  data: {
    providerId: string | null;
    provider: any;
    providerList: any[];
    cityList: any[];
    cityId: string | null;
    providersListByCity: any[];
  };
  loading: {
    provider: boolean;
    providerList: boolean;
    cityList: boolean;
    providersListByCity: boolean;
  };
};

const initialState: state = {
  data: {
    providerId: null,
    provider: {},
    providerList: [],
    cityList: [],
    cityId: null,
    providersListByCity: [],
  },
  loading: {
    provider: false,
    providerList: false,
    cityList: false,
    providersListByCity: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_PROVIDER_RECEIVE: {
      state.data.provider = payload.provider;
      return;
    }
    case Types.GET_PROVIDER_ALL_RECEIVE: {
      state.data.providerList = payload.providerList;
      return;
    }
    case Types.GET_PROVIDER_CITIES_RECEIVE: {
      state.data.cityList = payload.cityList;
      return;
    }
    case Types.GET_PROVIDER_BY_CITY_RECEIVE: {
      state.data.providersListByCity = payload.providerListByCity;
      return;
    }
    case Types.LOADING_PROVIDER: {
      state.loading[payload.name] = payload.status;
      return;
    }

    case Types.RESET_PROVIDER: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }
    default:
      return state;
  }
};

export default produce(reducer);
