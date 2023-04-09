import { api, paths } from ".";
const urlPath = paths.PackageContext;
const configOptions = { headers: { Authorization: false } };

export const getAllPackagesByUser = async ({ userId }: any) => {
  return await api.get(`${urlPath}/user/${userId}`, configOptions);
};

export const getPackageByPackageCode = async ({
  packageCode,
}: {
  packageCode: string;
}) => {
  return await api.get(`${urlPath}/packageCode/${packageCode}`, configOptions);
};

export const getPackageByPIN = async ({ pin }: any) => {
  return await api.get(`${urlPath}/pin/${pin}`, configOptions);
};

export const getPackage = async ({ packageId }: any) => {
  return await api.get(`${urlPath}/${packageId}`);
};

export const addPackage = async ({ pkg }: any) => {
  return await api.post(`${urlPath}`, pkg, configOptions);
};

export const updatePackage = async ({ packageId, pkg }: any) => {
  return await api.patch(`${urlPath}/${packageId}`, pkg, configOptions);
};

export const deletePackage = async ({ packageId }: any) => {
  return await api.delete(`${urlPath}/${packageId}`, configOptions);
};
