import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/cityTypes";

type city = {
  _id: string;
  stateCode: string;
  stateName: string;
  code: string;
  name: string;
  countryCode: string;
  countryName: string;
  enabled: boolean;
  totalNumberOfUsers: number;
};
export type cityState = { city: state };
type state = {
  data: {
    city: city | null;
    cityList: city[];
  };
  loading: {
    city: boolean;
    cityList: boolean;
  };
};

const initialState: state = {
  data: {
    city: null,
    cityList: [],
  },
  loading: {
    city: false,
    cityList: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_CITY_RECEIVE: {
      state.data.city = payload.city;
      return;
    }
    case Types.GET_CITIES_ALL_RECEIVE: {
      state.data.cityList = payload.cityList;
      return;
    }
    case Types.LOADING_CITY: {
      state.loading[payload.name] = payload.status;
      return;
    }

    case Types.RESET_CITY: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }
    default:
      return state;
  }
};

export default produce(reducer);
