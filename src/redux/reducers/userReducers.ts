import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/userTypes";
type userByPropetyInfo = {
  firstName: string;
  lastName: string;
  propertyInfo: {
    sectionNumber: number;
    propertyNumber: number;
  };
  admin: {
    uuid: string;
  };
  uuid: string;
};
type user = {
  enabled: boolean;
  roles: string[];
  isVerified: boolean;
  acceptPolicity: boolean;
  points: number;
  isOwner: boolean;
  debt: string;
  payOnTime: boolean;
  count: number;
  averagePoints: number;
  _id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  uniquecode: string;
  lastName: string;
  propertyInfo?: {
    sectionNumber: string;
    propertyNumber: string;
  };
  documentId: number;
  createdAt: string;
  updatedAt: string;
  code: string;
  __v: number;
  address: string;
  neighborhood: {
    _id: string;
    firstName: string;
    address: string;
  };
  fireToken: string;
  city: string;
};
export type userState = {user: state}
 type state = {
  data: {
    userId: string | null;
    user: user | null;
    userList: user[];
    userListBestPoints: user[];
    userListByPropertyInfo: userByPropetyInfo[];
  };
  loading: {
    user: boolean;
    userList: boolean;
    userListBestPoints: boolean;
    userListByPropertyInfo: boolean;
  };
};

const initialState: state = {
  data: {
    userId: null,
    user: null,
    userList: [],
    userListBestPoints: [],
    userListByPropertyInfo: [],
  },
  loading: {
    user: false,
    userList: false,
    userListBestPoints: false,
    userListByPropertyInfo: false,
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
    case Types.GET_USER_ALL_BY_PROPERTY_INFO_RECEIVE: {
      state.data.userListByPropertyInfo = payload.userListByPropertyInfo;
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
