// Types
import { Action } from "../reducers";
import Types from "../types/billTypes";

export const onGetBill: Function = (billId: any): Action => ({
  type: Types.GET_BILL,
  payload: {
    billId,
  },
});
export const onGetBillReceive: Function = (bill: any): Action => ({
  type: Types.GET_BILL_RECEIVE,
  payload: {
    bill,
  },
});

export const onGetAllBillsByUser: Function = (): Action => ({
  type: Types.GET_BILLS_BY_USER,
});

export const onGetAllBillsByProvider: Function = (): Action => ({
  type: Types.GET_BILLS_BY_PROVIDER,
});

export const onGetAllBillsReceive: Function = (billList: any): Action => ({
  type: Types.GET_BILLS_ALL_RECEIVE,
  payload: {
    billList,
  },
});

export const onAddBill: Function = (bill: any): Action => ({
  type: Types.ADD_BILL,
  payload: {
    bill,
  },
});

export const onUpdateBill: Function = (billId: string, bill: any): Action => ({
  type: Types.UPDATE_BILL,
  payload: {
    billId,
    bill,
  },
});

export const onDeleteBill: Function = (billId: any): Action => ({
  type: Types.DELETE_BILL,
  payload: {
    billId,
  },
});

export const onLoadingBill: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_BILL,
  payload: {
    name,
    status,
  },
});

export const onResetBill: Function = (name: string): Action => ({
  type: Types.RESET_BILL,
  payload: {
    name,
  },
});
