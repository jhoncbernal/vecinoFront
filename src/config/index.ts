const dev = {
  API_VERSION: "/v1/api",
  BASE_URL: "https://vecinoo.herokuapp.com",
  AdminContext: "admin",
  AllNeighborhoodsContext: "/admin/names/1",
  AuthSignUp: "/auth/signup",
  FileUploadImageContext: "/file/images/upload",
  LoginContext: "/auth/signin",
  ParkingSpaceContext: "/parkingspace",
  RecoveryPasswordContext: "/auth/recover",
  UserContext: "/user"
};

const prod = {
  API_VERSION: "/v1/api",
  BASE_URL: "https://vecinoo.herokuapp.com",
  AdminContext: "admin",
  AllNeighborhoodsContext: "/admin/names/1",
  AuthSignUp: "/auth/signup",
  FileUploadImageContext: "/file/images/upload",
  LoginContext: "/auth/signin",
  ParkingSpaceContext: "/parkingspace",
  RecoveryPasswordContext: "/auth/recover",
  UserContext: "/user"
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  APPLICATION_NAME: "Vecino",
  ...config
};
