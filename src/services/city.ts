import { api, paths } from ".";
const urlPath = paths.CityContex;
const configOptions = { headers: { Authorization: false } };

export const getCity = async ({ CityId }: any) => {
  return await api.get(`${urlPath}/${CityId}`);
};

export const getAllCitiesByProperty = async ({
  pageNum,
  pageSize,
  code,
  name,
  stateName,
  stateCode,
  countryCode,
}: any) => {
  return await api.get(`${urlPath}`, {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      code: code,
      name: name,
      stateName: stateName,
      stateCode: stateCode,
      countryCode: countryCode,
    },
  });
};

export const addCity = async ({ City }: any) => {
  return await api.patch(`${urlPath}`, City, configOptions);
};

export const updateCity = async ({ CityId, City }: any) => {
  return await api.patch(`${urlPath}/${CityId}`, City, configOptions);
};

export const deleteCity = async ({ CityId }: any) => {
  return await api.delete(`${urlPath}/${CityId}`, configOptions);
};
