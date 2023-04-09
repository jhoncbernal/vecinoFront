import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/adminTypes";
type admin = {
  enabled: boolean;
  roles: string[];
  acceptPolicity: boolean;
  isVerified: boolean;
  _id: string;
  username: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  uniquecode: string;
  totalNumberOfUsers: number;
  documentId: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  resetPasswordExpires: string;
  resetPasswordToken: string;
};
type adminsByCity = {
    propertyInfo: {
        numberOfSections: number;
        sectionType: string;
        numberOfProperties: number;
        propertyType: string;
        parkingLots: never[];
    };
    _id: string;
    firstName: string;
    address: string;
    uniquecode: string;
    postalCode: string;
};
export type adminState = { admin: state };

 type state = {
  data: {
    adminId: string | null;
    admin: admin | null;
    adminList: admin[];
    adminsListByName: { _id: string; firstName: string; uniquecode: string }[];
    adminsListByCity: adminsByCity[];
  };
  loading: {
    admin: boolean;
    adminList: boolean;
    adminsListByName: boolean;
    adminsListByCity: boolean;
  };
};

const initialState: state = {
  data: {
    adminId: null,
    admin: null,
    adminList: [],
    adminsListByName: [],
    adminsListByCity: [],
  },
  loading: {
    admin: false,
    adminList: false,
    adminsListByName: false,
    adminsListByCity: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ADMIN_RECEIVE: {
      state.data.admin = payload.admin;
      return;
    }
    case Types.GET_ADMIN_ALL_RECEIVE: {
      state.data.adminList = payload.adminList;
      return;
    }
    case Types.GET_ADMIN_BY_NAMES_RECEIVE: {
      state.data.adminsListByName = payload.adminsListByName;
      return;
    }
    case Types.GET_ADMIN_ALL_BY_CITY_RECEIVE: {
      state.data.adminsListByCity = payload.adminsListByCity;
      return;
    }
    case Types.LOADING_ADMIN: {
      state.loading[payload.name] = payload.status;
      return;
    }

    case Types.RESET_ADMIN: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }
    default:
      return state;
  }
};

export default produce(reducer);
