const dev = {
  API_VERSION: "/v1/api",
  BASE_URL: "http://localhost:4000",
  FILE_UPLOAD_IMAGE_CONTEXT: "/file/images/upload"
};

const prod = {
  API_VERSION: "/v1/api",
  BASE_URL: "https://vecinoo.herokuapp.com",
  FILE_UPLOAD_IMAGE_CONTEXT: "/file/images/upload"
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  APPLICATION_NAME: "Vecino",
  ...config
};
