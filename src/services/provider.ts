import { api, paths } from ".";
const urlPath = paths.ProviderContext;

export const getProvider = async ({ providerId }: any) => {
  return await api.get(`${urlPath}/${providerId}`);
};

export const getAllProviders = async () => {
  return await api.get(`${urlPath}`);
};

export const getProviderCities = async () => {
  return await api.get(`${urlPath}/cities/1`);
};

export const getProviderByCity = async ({ cityId }: any) => {
  return await api.get(`${urlPath}/names/${cityId}`);
};

export const addProvider = async ({ provider }: any) => {
  return await api.post(`${urlPath}`, provider);
};

export const updateProvider = async ({ providerId, providerData }: any) => {
  return await api.patch(`${urlPath}/${providerId}`, providerData);
};

export const deleteProvider = async ({ providerId }: any) => {
  return await api.delete(`${urlPath}/${providerId}`);
};
