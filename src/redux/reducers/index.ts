// Reducers
import adminReducers from "./adminReducers";
import authReducer from "./authReducers";
import billReducers from "./billReducers";
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
  auth: authReducer,
  user: userReducers,
  admin: adminReducers,
  bill: billReducers,
};

export default reducers;
