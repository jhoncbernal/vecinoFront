import adminSagas from "./adminSagas";
import authSagas from "./authSagas";
import billSagas from "./billSagas";
import providerSagas from "./providerSagas";
import userSagas from "./userSagas";
import packageSagas from "./packageSagas";
import citySagas from "./citySagas";


export default [...providerSagas,...authSagas,...userSagas,...adminSagas,...billSagas,...packageSagas,...citySagas];