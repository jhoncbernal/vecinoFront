import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/loginTypes";

export type state = {
  data: {
    token: string | null;
    login: {
      email: string | null;
      password: string | null;
    };
  };
  loading: {
    login: boolean;
  };
};

const initialState: state = {
  data: {
    token: null,
    login: {
      email: null,
      password: null,
    },
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
      state.data.login = initialState.data.login;
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
