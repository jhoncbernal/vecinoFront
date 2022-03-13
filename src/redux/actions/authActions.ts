// Types
import Types from "../types/authTypes";

export type Action = {
  type: string;
  payload?: any;
};

export const onAuth: Function = (auth: any): Action => ({
  type: Types.ON_AUTH,
  payload: { auth },
});

export const onAuthReceive: Function = ({token}: any ): Action => ({
  type: Types.ON_AUTH_RECEIVE,
  payload: {
    token,
  },
});

export const onLoadingAuth: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_AUTH,
  payload: {
    name,
    status,
  },
});

export const onResetAuth: Function = (name: string): Action => ({
  type: Types.RESET_AUTH,
  payload: {
    name,
  },
});
