// Types
import { Action } from "../reducers";
import Types from "../types/providerTypes";

export const onGetProvider: Function = (providerId: any): Action => ({
  type: Types.GET_PROVIDER,
  payload: {
    providerId,
  },
});
export const onGetProviderRecive: Function = (provider: any): Action => ({
  type: Types.GET_PROVIDER_RECEIVE,
  payload: {
    provider,
  },
});

export const onGetAllProviders: Function = (): Action => ({
  type: Types.GET_PROVIDER_ALL,
});

export const onGetAllProvidersRecive: Function = (
  providerList: any,
): Action => ({
  type: Types.GET_PROVIDER_ALL_RECEIVE,
  payload: {
    providerList,
  },
});

export const onGetProviderCities: Function = (): Action => ({
  type: Types.GET_PROVIDER_CITIES,
});

export const onGetProviderCitiesRecive: Function = (cityList: any): Action => ({
  type: Types.GET_PROVIDER_CITIES_RECEIVE,
  payload: {
    cityList,
  },
});

export const onGetProviderByCity: Function = (cityId: string): Action => ({
  type: Types.GET_PROVIDER_BY_CITY,
  payload: {
    cityId,
  },
});

export const onGetProviderByCityRecive: Function = (
  providersListByCity: any,
): Action => ({
  type: Types.GET_PROVIDER_BY_CITY_RECEIVE,
  payload: {
    providersListByCity,
  },
});

export const onAddProvider: Function = (provider: any): Action => ({
  type: Types.ADD_PROVIDER,
  payload: {
    provider,
  },
});

export const onUpdateProvider: Function = (
  providerId: string,
  provider: any,
): Action => ({
  type: Types.UPDATE_PROVIDER,
  payload: {
    providerId,
    provider,
  },
});

export const onDeleteProvider: Function = (providerId: any): Action => ({
  type: Types.DELETE_PROVIDER,
  payload: {
    providerId,
  },
});

export const onLoadingProvider: Function = (
  name: string,
  status: string,
): Action => ({
  type: Types.LOADING_PROVIDER,
  payload: {
    name,
    status,
  },
});

export const onResetProvider: Function = (name: string): Action => ({
  type: Types.RESET_PROVIDER,
  payload: {
    name,
  },
});
