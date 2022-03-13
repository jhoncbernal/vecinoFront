import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/authTypes";

export type state = {
  data: {
    token: string | null;
    auth: {
      email: string | null;
      password: string | null;
    };
  };
  loading: {
    auth: boolean;
  };
};

const initialState: state = {
  data: {
    token: null,
    auth: {
      email: null,
      password: null,
    },
  },
  loading: {
    auth: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.ON_AUTH: {
      state.data.auth = payload.auth;
      return;
    }

    case Types.ON_AUTH_RECEIVE: {
      state.data.token = payload.token;
      state.data.auth = initialState.data.auth;
      return;
    }

    case Types.LOADING_AUTH: {
      state.loading[payload.name] = payload.status;
      return;
    }

    case Types.RESET_AUTH: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }

    default:
      return state;
  }
};

export default produce(reducer);
