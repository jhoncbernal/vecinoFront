import { api, paths } from ".";
const urlPath = paths.BillsContext;
const configOptions = { headers: { Authorization: true } };
export const getBill = async ({ billId }: any) => {
  return await api.get(`${urlPath}/${billId}`);
};

export const getAllBillsByUser = async () => {
  return await api.get(`${urlPath}`, configOptions);
};

export const getAllBillsByProvider = async () => {
  return await api.get(`${urlPath}/provider/1`, configOptions);
};

export const addBill = async ({ bill }: any) => {
  return await api.patch(`${urlPath}`, bill, configOptions);
};

export const updateBill = async ({ billId, bill }: any) => {
  return await api.patch(`${urlPath}/${billId}`, bill, configOptions);
};

export const deleteBill = async ({ billId }: any) => {
  return await api.delete(`${urlPath}/${billId}`, configOptions);
};
