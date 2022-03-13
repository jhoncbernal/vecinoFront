import { api, paths } from ".";
const urlPath= paths.LoginContext;
export const auth = async ({ auth }: any) => {
  return await api.post(urlPath, auth);
};
