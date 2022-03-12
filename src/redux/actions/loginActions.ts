// Types
import Types from "../types/loginTypes";

export type Action = {
  type: string;
  payload?: any;
};

export const onLogin: Function = (login: any): Action => ({
  type: Types.ON_LOGIN,
  payload: { login },
});

export const onLoginReceive: Function = (token: string): Action => ({
  type: Types.ON_LOGIN_RECEIVE,
  payload: {
    token,
  },
});

export const onLoadingLogin: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_LOGIN,
  payload: {
    name,
    status,
  },
});

export const onResetLogin: Function = (name: string): Action => ({
  type: Types.RESET_LOGIN,
  payload: {
    name,
  },
});
