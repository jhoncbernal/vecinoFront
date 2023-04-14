// Types
import { Action } from "../reducers";
import Types from "../types/adminTypes";

export const onGetAdmin: Function = (adminId: any): Action => ({
  type: Types.GET_ADMIN,
  payload: {
    adminId,
  },
});
export const onGetAdminReceive: Function = (admin: any): Action => ({
  type: Types.GET_ADMIN_RECEIVE,
  payload: {
    admin,
  },
});

export const onGetAllAdmins: Function = (): Action => ({
  type: Types.GET_ADMIN_ALL,
});

export const onGetAllAdminsReceive: Function = (adminList: any): Action => ({
  type: Types.GET_ADMIN_ALL_RECEIVE,
  payload: {
    adminList,
  },
});
export const onGetAllAdminsByCity: Function = (cityName: any): Action => ({
  type: Types.GET_ADMIN_ALL_BY_CITY,
  payload: {
    cityName,
  },
});

export const onGetAllAdminsByCityReceive: Function = (
  adminsListByCity: any,
): Action => ({
  type: Types.GET_ADMIN_ALL_BY_CITY_RECEIVE,
  payload: {
    adminsListByCity,
  },
});

export const onGetAdminNames: Function = (): Action => ({
  type: Types.GET_ADMIN_BY_NAMES,
});

export const onGetAdminNamesReceive: Function = (
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
