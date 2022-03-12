import axios from "axios";
import config from "../config";
const api = axios.create({
  baseURL: `${config.BASE_URL}${config.API_VERSION}`,
});

export { api, config as paths};