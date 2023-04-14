import { api, paths } from ".";
const urlPath = paths.UserContext;
const configOptions = { headers: { Authorization: true } };
export const getUser = async ({ userId }: any) => {
  return await api.get(`${urlPath}/${userId}`, configOptions);
};

export const getAllUsers = async () => {
  return await api.get(`${urlPath}`);
};

export const getAllUsersByPropertyInfo = async ({
  propertyNumber,
  sectionNumber,
}: any) => {
  console.log("propertyNumber", propertyNumber);
  return await api.get(`${urlPath}/propety/1`, {
    params: { propertyNumber, sectionNumber },
  });
};

export const getUsersByPoints = async () => {
  return await api.get(`${urlPath}/bestpoints/1`, configOptions);
};

export const updateUser = async ({ userId, user }: any) => {
  return await api.patch(`${urlPath}/${userId}`, user);
};

export const deleteUser = async ({ userId }: any) => {
  return await api.delete(`${urlPath}/${userId}`);
};
