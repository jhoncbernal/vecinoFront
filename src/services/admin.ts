import { api, paths } from ".";
const urlPath = paths.AdminContext;
const configOptions = { headers: { Authorization: true } };
export const getAdmin = async ({ adminId }: any) => {
  return await api.get(`${urlPath}/${adminId}`, configOptions);
};

export const getAllAdmins = async () => {
  return await api.get(`${urlPath}`, configOptions);
};

export const getAdminsByCity = async ({ cityName }: any) => {
  return await api.get(`${urlPath}/city/${cityName}`);
};

export const getAdminsNames = async () => {
  return await api.get(`${urlPath}/names/1`);
};

export const addAdmin = async ({ provider }: any) => {
  return await api.post(`${urlPath}`, provider, configOptions);
};

export const updateAdmin = async ({ adminId, admin }: any) => {
  return await api.patch(`${urlPath}/${adminId}`, admin, configOptions);
};

export const deleteAdmin = async ({ adminId }: any) => {
  return await api.delete(`${urlPath}/${adminId}`, configOptions);
};
