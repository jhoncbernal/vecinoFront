// Types
import { Action } from "../reducers";
import Types from "../types/userTypes";

export const onGetUser: Function = (userId: any): Action => ({
  type: Types.GET_USER,
  payload: {
    userId,
  },
});
export const onGetUserReceive: Function = (user: any): Action => ({
  type: Types.GET_USER_RECEIVE,
  payload: {
    user,
  },
});

export const onGetAllUsers: Function = (): Action => ({
  type: Types.GET_USER_ALL,
});

export const onGetAllUsersReceive: Function = (userList: any): Action => ({
  type: Types.GET_USER_ALL_RECEIVE,
  payload: {
    userList,
  },
});

export const onGetUsersByPoints: Function = (): Action => ({
  type: Types.GET_USER_BY_POINTS,
});

export const onGetUsersByPointsReceive: Function = (
  userListBestPoints: any,
): Action => ({
  type: Types.GET_USER_BY_POINTS_RECEIVE,
  payload: {
    userListBestPoints,
  },
});

export const onUpdateUser: Function = (userId: string, user: any): Action => ({
  type: Types.UPDATE_USER,
  payload: {
    userId,
    user,
  },
});

export const onDeleteUser: Function = (userId: any): Action => ({
  type: Types.DELETE_USER,
  payload: {
    userId,
  },
});

export const onLoadingUser: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_USER,
  payload: {
    name,
    status,
  },
});

export const onResetUser: Function = (name: string): Action => ({
  type: Types.RESET_USER,
  payload: {
    name,
  },
});
