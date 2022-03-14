import produce from "immer";
import { Action } from ".";
// Types
import Types from "../types/billTypes";

type product = {
  _id: string;
  urlImage: string;
  productName: string;
  measureType: string;
  price: number;
  salving: number;
  quantity: number;
};

type schedule = {
  days: string[];
  _id: string;
  open: string;
  close: string;
};

type neighborhood = {
  _id: string;
  firstName: string;
  address: string;
};

type provider = {
  _id: string;
  firstName: string;
  address: string;
  documentId: number;
  deliveryCharge: number;
  deliveryExtraCharge: number;
  billType: string;
  schedule: schedule;
};

type user = {
  _id: string;
  email: string;
  phone: string;
  firstName: string;
  homeNumber: number;
  blockNumber: number;
  address: string;
  neighborhood: neighborhood;
};

type states = {
  start: string;
  state: string;
};

type bill = {
  deliveryExtraCharge: number;
  enabled: boolean;
  _id: string;
  DeliverySchedule: string;
  MethodOfPayment: string;
  products: product[];
  provider: provider;
  user: user;
  states: states[];
  tip: number;
  deliveryCharge: number;
  subTotal: number;
  Total: number;
  billType: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type state = {
  data: {
    billId: string | null;
    bill: bill | null;
    billList: bill[];
  };
  loading: {
    bill: boolean;
    billList: boolean;
  };
};

const initialState: state = {
  data: {
    billId: null,
    bill: null,
    billList: [],
  },
  loading: {
    bill: false,
    billList: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_BILL_RECEIVE: {
      state.data.bill = payload.bill;
      return;
    }
    case Types.GET_BILLS_ALL_RECEIVE: {
      state.data.billList = payload.billList;
      return;
    }
    case Types.LOADING_BILL: {
      state.loading[payload.name] = payload.status;
      return;
    }
    case Types.RESET_BILL: {
      if (payload.name === "*") return initialState;
      state.data[payload.name] = initialState.data[payload.name];
      return;
    }
    default:
      return state;
  }
};

export default produce(reducer);
