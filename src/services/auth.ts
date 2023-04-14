import { api, paths } from ".";
const urlPath= paths.AuthContext;

export const recover = async ({ auth }: any) => {
  return await api.post(`${urlPath}/recover`, auth);
};

export const signIn = async ({ auth }: any) => {
  return await api.post(`${urlPath}/signin`, auth);
};
export const signUp = async ({ auth }: any) => {
  return await api.post(`${urlPath}/signup`, auth);
};
