import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: `${config.BASE_URL}${config.API_VERSION}`,
});

export const login = async ({login}:any) => {
  return await api.post(config.LoginContext, login);
};