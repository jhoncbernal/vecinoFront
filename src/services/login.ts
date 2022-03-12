import { api, paths } from ".";
const urlPath= paths.LoginContext;
export const login = async ({ login }: any) => {
  return await api.post(urlPath, login);
};
