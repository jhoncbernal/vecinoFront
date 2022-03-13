import loginSagas from "./loginSagas";
import providerSagas from "./providerSagas";
import userSagas from "./userSagas";


export default [...providerSagas,...loginSagas,...userSagas];