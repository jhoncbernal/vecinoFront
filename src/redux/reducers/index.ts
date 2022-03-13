// Reducers
import adminReducers from "./adminReducers";
import loginReducer from "./loginReducers";
import providerReducers from "./providerReducers";
import userReducers from "./userReducers";
export type Action = {
  type: string;
  payload?: any;
  message?: string;
};

// Add Reducers
const reducers = {
  provider: providerReducers,
  login: loginReducer,
  user: userReducers,
  admin: adminReducers,
};

export default reducers;
