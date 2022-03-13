// Types
import { Action } from "../reducers";
import Types from "../types/adminTypes";

export const onGetAdmin: Function = (adminId: any): Action => ({
  type: Types.GET_ADMIN,
  payload: {
    adminId,
  },
});
export const onGetAdminRecive: Function = (admin: any): Action => ({
  type: Types.GET_ADMIN_RECEIVE,
  payload: {
    admin,
  },
});

export const onGetAllAdmins: Function = (): Action => ({
  type: Types.GET_ADMIN_ALL,
});

export const onGetAllAdminsRecive: Function = (adminList: any): Action => ({
  type: Types.GET_ADMIN_ALL_RECEIVE,
  payload: {
    adminList,
  },
});

export const onGetAdminNames: Function = (): Action => ({
  type: Types.GET_ADMIN_BY_NAMES,
});

export const onGetAdminNamesRecive: Function = (
  adminsListByName: any,
): Action => ({
  type: Types.GET_ADMIN_BY_NAMES_RECEIVE,
  payload: {
    adminsListByName,
  },
});

export const onAddAdmin: Function = (admin: any): Action => ({
  type: Types.ADD_ADMIN,
  payload: {
    admin,
  },
});

export const onUpdateAdmin: Function = (
  adminId: string,
  admin: any,
): Action => ({
  type: Types.UPDATE_ADMIN,
  payload: {
    adminId,
    admin,
  },
});

export const onDeleteAdmin: Function = (adminId: any): Action => ({
  type: Types.DELETE_ADMIN,
  payload: {
    adminId,
  },
});

export const onLoadingAdmin: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_ADMIN,
  payload: {
    name,
    status,
  },
});

export const onResetAdmin: Function = (name: string): Action => ({
  type: Types.RESET_ADMIN,
  payload: {
    name,
  },
});