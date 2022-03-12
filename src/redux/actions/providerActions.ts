// Types
import * as Types from "../types/providerTypes";

export type Action = {
  type: string;
  payload?: any;
};

export const onLogin: Function = (data: any): Action => ({
  type: Types.ON_LOGIN,
  payload: {
    login:data,
  },
});

export const onLoginReceive: Function = (token:string): Action => ({
  type: Types.ON_LOGIN_RECEIVE,
  payload: {
   token
  },
});

export const onGetProviderInfo: Function = (): Action => ({
  type: Types.GET_PROVIDER_INFO,
});

export const onGetProviderInfoReceive: Function = (provider: any): Action => ({
  type: Types.GET_PROVIDER_INFO_RECEIVE,
  payload: {
    provider:provider,
  },
});

export const onLoadingLogin: Function = (
  name: string,
  status: string
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
