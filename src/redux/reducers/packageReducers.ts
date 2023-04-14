import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/packageTypes";


type newPackage={
    usersUuids: string[];
    packageCodes: string[];
    pin: string;
}
type pkgPIN={
    packageCodes: string[];
    propertyInfo: propertyInfo;
    admin_uuid: string;
    users: {
        name: string;
        uuid: string;
    }[];
}
type pkg = {
  _id: string;
  packageCode: string;
  deliveryCompany: string;
  receivedBy: string;
  status: string;
  pin: string;
  admin: admin[];
  signature: string;
  imageUrl: string;
  notificationWay: string;
  uuid: string;
  receivedAt: string;
  users: user[];
};

type propertyInfo = {
  sectionNumber: string;
  propertyNumber: string;
};

type user = {
  _id?: string;
  uuid: string;
  firstName?: string;
  propertyInfo?: propertyInfo;
  admin?: admin;
};
type admin = {
  _id?: string;
  uuid: string;
  firstName?: string;
  uniquecode?: string;
};
export type packageState = { package: state };
 type state = {
  data: {
    packageId: string | null;
    pkg: pkg | null;
    packageList: pkg[];
    pkgByPIN: pkgPIN | null;
    newPackage: newPackage | null;
  };
  loading: {
    package: boolean;
    packageList: boolean;
    newPackage: boolean;
  };
};

const initialState: state = {
  data: {
    packageId: null,
    pkg: null,
    packageList: [],
    pkgByPIN: null,
    newPackage: null,
  },
  loading: {
    package: false,
    packageList: false,
    newPackage: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_PACKAGE_RECEIVE: {
      state.data.pkg = payload.pkg;
      return;
    }
    case Types.GET_ALL_PACKAGE_RECEIVE: {
      state.data.packageList = payload.packageList;
      return;
    }
    case Types.ADD_PACKAGE_RECEIVE: {
      state.data.newPackage = payload.pkg;
      return;
    }
    case Types.GET_PACKAGE_BY_PIN_RECEIVE: {
      state.data.pkgByPIN = payload.pkgByPIN;
      return;
    }
    case Types.LOADING_PACKAGE: {
      state.loading[payload.name] = payload.status;
      return;
    }
    case Types.RESET_PACKAGE: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }
    default:
      return state;
  }
};

export default produce(reducer);
