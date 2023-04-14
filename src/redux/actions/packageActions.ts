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

export const onGetAllPackagesReceive: Function = (
         packageList: any,
       ): Action => ({
         type: Types.GET_ALL_PACKAGE_RECEIVE,
         payload: {
           packageList,
         },
       });

export const onGetPackagesByUser: Function = (userId: any): Action => ({
  type: Types.GET_PACKAGES_BY_USER,
  payload: {
    userId,
  },
});

export const onGetPackagesByAdmin: Function = (adminId: any): Action => ({
  type: Types.GET_PACKAGES_BY_ADMIN,
  payload: {
    adminId,
  },
});

export const onGetPackagesByPIN: Function = (pin: any): Action => ({
  type: Types.GET_PACKAGES_BY_PIN,
  payload: {
    pin,
  },
});

export const onUpdatePackagesStatusByPIN: Function = (
  pin: string,
  signedBy: string,
): Action => ({
  type: Types.UPDATE_PACKAGE_STATUS_BY_PIN,
  payload: {
    pin,
    signedBy,
  },
});

export const onGetPackageByPinReceive: Function = (pkgByPIN: any): Action => ({
  type: Types.GET_PACKAGE_BY_PIN_RECEIVE,
  payload: {
    pkgByPIN,
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

export const onAddPackageReceive: Function = (pkg: any): Action => ({
  type: Types.ADD_PACKAGE_RECEIVE,
  payload: {
    pkg,
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
