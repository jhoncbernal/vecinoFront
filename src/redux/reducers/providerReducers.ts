import produce from "immer";
// Types
import * as Types from "../types/providerTypes";
import { Action } from "../types/actionTypes";

export type state = {
  data: {
    provider: any;
    token: string | null;
    login: {
      email: string;
      password: string;
    };
  };
  loading: {
    login: boolean;
  };
};

const initialState: state | any = {
  data: {
    provider: {},
    token: null,
  },
  loading: {
    login: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.ON_LOGIN: {
      state.data.login = payload.login;
      return;
    }

    case Types.ON_LOGIN_RECEIVE: {
      state.data.token = payload.token;
      state.data.login = {};
      return;
    }

    case Types.GET_PROVIDER_INFO_RECEIVE: {
      state.data.provider = payload.provider;
      return;
    }

    case Types.LOADING_LOGIN: {
      state.loading[payload.name] = payload.status;
      return;
    }

    case Types.RESET_LOGIN: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }

    default:
      return state;
  }
};

export default produce(reducer);
