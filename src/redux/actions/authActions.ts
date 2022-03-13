// Types
import Types from "../types/authTypes";

export type Action = {
  type: string;
  payload?: any;
};

export const onSignIn: Function = (auth: any): Action => ({
  type: Types.ON_SIGN_IN,
  payload: { auth },
});

export const onSignInReceive: Function = ({ token }: any): Action => ({
  type: Types.ON_SIGN_IN_RECEIVE,
  payload: {
    token,
  },
});

export const onSignUp: Function = (auth: any): Action => ({
  type: Types.ON_SIGN_UP,
  payload: { auth },
});

export const onRecover: Function = (auth: any): Action => ({
  type: Types.ON_RECOVER,
  payload: { auth },
});

export const onRecoverReceive: Function = (recover: any): Action => ({
         type: Types.ON_RECOVER_RECEIVE,
         payload: { recover },
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
