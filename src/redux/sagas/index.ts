import adminSagas from "./adminSagas";
import authSagas from "./authSagas";
import providerSagas from "./providerSagas";
import userSagas from "./userSagas";


export default [...providerSagas,...authSagas,...userSagas,...adminSagas];