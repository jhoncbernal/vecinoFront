import adminSagas from "./adminSagas";
import authSagas from "./authSagas";
import billSagas from "./billSagas";
import providerSagas from "./providerSagas";
import userSagas from "./userSagas";
import packageSagas from "./packageSagas";


export default [...providerSagas,...authSagas,...userSagas,...adminSagas,...billSagas,...packageSagas];