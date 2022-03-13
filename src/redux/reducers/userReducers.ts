import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/userTypes";

export type state = {
  data: {
    userId: string | null;
    user: any;
    userList: any[];
    userListBestPoints: any[];
  };
  loading: {
    user: boolean;
    userList: boolean;
    userListBestPoints: boolean;
  };
};

const initialState: state = {
  data: {
    userId: null,
    user: {},
    userList: [],
    userListBestPoints: [],
  },
  loading: {
    user: false,
    userList: false,
    userListBestPoints: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_USER_RECEIVE: {
      state.data.user = payload.user;
      return;
    }
    case Types.GET_USER_ALL_RECEIVE: {
      state.data.userList = payload.userList;
      return;
    }
    case Types.GET_USER_BY_POINTS_RECEIVE: {
      state.data.userListBestPoints = payload.userListBestPoints;
      return;
    }
    case Types.LOADING_USER: {
      state.loading[payload.name] = payload.status;
      return;
    }

    case Types.RESET_USER: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }
    default:
      return state;
  }
};

export default produce(reducer);
