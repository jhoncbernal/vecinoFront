// Reducers
import loginReducer from "./loginReducers";
import providerReducers from "./providerReducers";
export type Action = {
  type: string;
  payload?: any;
  message?: string;
};

// Add Reducers
const reducers = {
  provider: providerReducers,
  login: loginReducer,
};

export default reducers;
