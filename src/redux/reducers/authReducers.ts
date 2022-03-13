import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/authTypes";
type recover = {
  message: string;
  emailResult: {
    result: {
      accepted: string[];
      rejected: never[];
      envelopeTime: number;
      messageTime: number;
      messageSize: number;
      response: string;
      envelope: {
        from: string;
        to: string[];
      };
      messageId: string;
    };
  };
};
export type state = {
  data: {
    token: string | null;
    recover: recover | null;
  };
  loading: {
    signIn: boolean;
    signUp: boolean;
    recover: boolean;
  };
};

const initialState: state = {
  data: {
    token: null,
    recover: null,
  },
  loading: {
    signIn: false,
    signUp: false,
    recover: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.ON_SIGN_IN: {
      return;
    }

    case Types.ON_SIGN_IN_RECEIVE: {
      state.data.token = payload.token;
      return;
    }
    case Types.ON_RECOVER_RECEIVE: {
      state.data.recover = payload.recover;
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
