// Types
import { Action } from "../reducers";
import Types from "../types/packageTypes";

export const onGetPackage: Function = (packageId: any): Action => ({
  type: Types.GET_PACKAGE,
  payload: {
    packageId,
  },
});
export const onGetPackageReceive: Function = (pkg: any): Action => ({
  type: Types.GET_PACKAGE_RECEIVE,
  payload: {
    pkg,
  },
});

export const onGetAllPackagesReceive: Function = (pkg: any): Action => ({
  type: Types.GET_PACKAGE_RECEIVE,
  payload: {
    pkg,
  },
});

export const onGetPackagesByUser: Function = (userId: any): Action => ({
  type: Types.GET_PACKAGES_BY_USER,
  payload: {
    userId,
  },
});

export const onGetPackagesByPIN: Function = (pin: any): Action => ({
  type: Types.GET_PACKAGES_BY_PIN,
  payload: {
    pin,
  },
});

export const onGetPackageByPinReceive: Function = (pkg: any): Action => ({
  type: Types.GET_PACKAGE_BY_PIN_RECEIVE,
  payload: {
    pkg,
  },
});


export const onGetPackagesByPackageCode: Function = (
  packageCode: any,
): Action => ({
  type: Types.GET_PACKAGES_BY_PACKAGE_CODE,
  payload: {
    packageCode,
  },
});

export const onAddPackage: Function = (pkg: any): Action => ({
  type: Types.ADD_PACKAGE,
  payload: {
    pkg,
  },
});

export const onUpdatePackage: Function = (
  packageId: string,
  pkg: any,
): Action => ({
  type: Types.UPDATE_PACKAGE,
  payload: {
    packageId,
    pkg,
  },
});

export const onDeletePackage: Function = (packageId: any): Action => ({
  type: Types.DELETE_PACKAGE,
  payload: {
    packageId,
  },
});

export const onLoadingPackage: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_PACKAGE,
  payload: {
    name,
    status,
  },
});

export const onResetPackage: Function = (name: string): Action => ({
  type: Types.RESET_PACKAGE,
  payload: {
    name,
  },
});
