declare const process: any;

const general = {
  googleApiKey: process.env.REACT_APP_GOOGLE_API,
  AdminContext: "/admin",
  AllNeighborhoodsContext: "/admin/names/1",
  AuthSignUp: "/auth/signup",
  FileUploadImageContext: "/file/images/upload",
  FileDeleteImageContext: "/file/images/delete",
  LoginContext: "/auth/signin",
  ParkingSpaceContext: "/parkingspace",
  RecoveryPasswordContext: "/auth/recover",
  AuthContext: "/auth",
  UserContext: "/user",
  ProductContext: "/product",
  FileContext: "/file",
  BillsContext: "/bill",
  ProviderContext: "/provider",
  RolProviderAccess: "ROLE_PROVIDER_ACCESS",
  RolUserAccess: "ROLE_USER_ACCESS",
  RolAdminAccess: "ROLE_ADMINISTRATION_ACCESS",
  RolSecurityAccess: "ROLE_SECURITY",
};
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const dev = {
  API_VERSION: "/v1/api",
  BASE_URL: "http://localhost:4000",
  ...general
};

const prod = {
  API_VERSION: "/v1/api",
  BASE_URL: "https://vecinoob.herokuapp.com",
  ...general
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  APPLICATION_NAME: "Vecino",
  ...config,
  firebaseConfig,
};
