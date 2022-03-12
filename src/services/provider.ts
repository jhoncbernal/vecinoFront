import { api, paths } from ".";

export const login = async ({ login }: any) => {
  return await api.post(paths.LoginContext, login);
};
