const dev = {
  API_VERSION: "/v1/api",
  BASE_URL: "http://localhost:4000",
  AdminContext: "admin",
  AllNeighborhoodsContext: "/admin/names/1",
  AuthSignUp: "/auth/signup",
  FileUploadImageContext: "/file/images/upload",
  FileDeleteImageContext: "/file/images/delete",
  LoginContext: "/auth/signin",
  ParkingSpaceContext: "/parkingspace",
  RecoveryPasswordContext: "/auth/recover",
  UserContext: "/user",
  ProductContext: "/product",
  FileContext: "/file",
  BillsContext: "/bill",
  ProviderContext: "/provider",
  RolProviderAccess: "ROLE_PROVIDER_ACCESS",
  RolUserAccess: "ROLE_USER_ACCESS",
  RolAdminAccess: "ROLE_ADMINISTRATION_ACCESS",
  RolSecurityAccess: "ROLE_SECURITY"
};

const prod = {
  API_VERSION: "/v1/api",
  BASE_URL: "https://vecinoob.herokuapp.com",
  AdminContext: "/admin",
  AllNeighborhoodsContext: "/admin/names/1",
  AuthSignUp: "/auth/signup",
  FileUploadImageContext: "/file/images/upload",
  FileDeleteImageContext: "/file/images/delete",
  LoginContext: "/auth/signin",
  ParkingSpaceContext: "/parkingspace",
  RecoveryPasswordContext: "/auth/recover",
  UserContext: "/user",
  ProductContext: "/product",
  FileContext: "/file",
  BillsContext: "/bill",
  ProviderContext: "/provider",
  RolProviderAccess: "ROLE_PROVIDER_ACCESS",
  RolUserAccess: "ROLE_USER_ACCESS",
  RolAdminAccess: "ROLE_ADMINISTRATION_ACCESS",
  RolSecurityAccess: "ROLE_SECURITY"
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  APPLICATION_NAME: "Vecino",
  ...config
};
