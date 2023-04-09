// Types
import { Action } from "../reducers";
import Types from "../types/cityTypes";

export const onGetCity: Function = (cityName: any): Action => ({
    type: Types.GET_CITY,
    payload: {
        cityName,
    },
});

export const onGetCityReceive: Function = (city: any): Action => ({
    type: Types.GET_CITY_RECEIVE,
    payload: {
        city,
    },
});

export const onGetAllCities: Function = (
         pageNum: string,
         pageSize: string,
         code: string,
         name: string,
         stateName: string,
         stateCode: string,
         countryCode: string,
       ): Action => ({
         type: Types.GET_CITIES_ALL,
       payload: {
         pageNum,
         pageSize,
         code,
         name,
         stateName,
         stateCode,
         countryCode,
         }
        });

export const onGetAllCitiesReceive: Function = (cityList: any): Action => ({
    type: Types.GET_CITIES_ALL_RECEIVE,
    payload: {
        cityList,
    },
});

export const onAddCity: Function = (city: any): Action => ({
    type: Types.ADD_CITY,
    payload: {
        city,
    },
});

export const onDeleteCity: Function = (cityName: any): Action => ({
    type: Types.DELETE_CITY,
    payload: {
        cityName,
    },
});

export const onUpdateCity: Function = (city: any): Action => ({
    type: Types.UPDATE_CITY,
    payload: {
        city,
    },
});

export const onLoadingCity: Function = (
         name: string,
         status: string,
       ): Action => ({
         type: Types.LOADING_CITY,
         payload: {
           name,
           status,
         },
       });

export const onResetCity: Function = (): Action => ({
    type: Types.RESET_CITY,
});

