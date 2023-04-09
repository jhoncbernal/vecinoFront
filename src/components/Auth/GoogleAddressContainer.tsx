/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonLabel,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonInput,
} from "@ionic/react";
import {
  homeOutline,
  mapOutline,
  businessOutline,
  locationOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import FilterableList from "./FilterableList";
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { onGetAllAdminsByCity } from "../../Redux/actions/adminActions";
import { adminState } from "../../Redux/reducers/adminReducers";
import {
  onGetAllCities,
  onGetCity,
  onGetCityByName,
} from "../../Redux/actions/cityActions";
import { cityState } from "../../Redux/reducers/cityReducers";

interface ContainerProps {
  [id: string]: any;
}
interface Address {
  neighborhood?: Neighborhood;
  city: string;
  postalCode?: string;
  validPostalCode?: boolean;
  province?: string;
  propertyInfo?: {
    sectionNumber: string;
    propertyNumber: string;
  };
}
interface Neighborhood {
  firstName: string;
  uniquecode: string;
  propertyInfo?: {
    sectionNumber: string;
    sectionType: string;
    numberOfProperties: string;
    propertyType: string;
    numberOfSections: string;
  };
}
const GoogleAddressContainer: React.FC<ContainerProps> = ({
  onAGoogleAddressDataChange,
  clearData,
}) => {
  const [newAddress, setNewAddress] = useState<Address | undefined>();
  const handleNewAddress = (propertyName: string, value: any) => {
    setNewAddress((prevState: any) => ({
      ...prevState,
      ...{
        [propertyName]: value,
      },
    }));
  };
  const dispatch = useDispatch();
  //selectors
  const neighborhoods = useSelector(
    (state: adminState) => state.admin.data.adminsListByCity,
  );
  const cities = useSelector((state: cityState) => state.city.data.cityList);
  const city = useSelector((state: cityState) => state.city.data.city);

  //dispatches
  const handleCity = (city: string) => {
    const upperCaseCity = city?.toUpperCase();
    if (upperCaseCity && upperCaseCity !== newAddress?.city) {
      dispatch(onGetCityByName(upperCaseCity));
      dispatch(onGetAllAdminsByCity(upperCaseCity));
    }
  };

  const handleCitiesByStateName = (stateName: string) => {
    const params = {
      pageNum: 1,
      pageSize: 100,
      code: "",
      name: "",
      stateName: stateName,
      stateCode: "",
      countryCode: "",
    };
    if (stateName)
      dispatch(
        onGetAllCities(
          params.pageNum,
          params.pageSize,
          params.code,
          params.name,
          params.stateName,
          params.stateCode,
          params.countryCode,
        ),
      );
  };

  // handle selectors data change
  useEffect(() => {
    if (neighborhoods.length > 0) {
      const nei = neighborhoods.filter(
        (neighborhood: any) =>
          neighborhood.postalCode === newAddress?.postalCode,
      );
      if (nei[0]) handleNewAddress("neighborhood", nei[0]);
    }
  }, [neighborhoods]);

  useEffect(() => {
    if (city) {
      handleNewAddress("city", city.name);
      handleNewAddress("cityCode", city.code);
      handleNewAddress("countryCode", city.countryCode);
      handleNewAddress("stateCode", city.stateCode);
    }
  }, [city]);

  //functions to handle data change
  function generateNumberArray(start: number, end: number): any[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => {
      return { number: String(start + i) };
    });
  }

  const handleNeighborhood = (item: string) => {
    const neighbor = neighborhoods?.filter(
      (neighborhood) => neighborhood.firstName === item,
    );
    if (neighbor && neighbor?.length > 0) {
      handleNewAddress("neighborhood", neighbor[0]);
    }
  };

  const handlePostalCodeChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    const value = target?.value;
    if (target && value) {
      const postalCodeRegex = new RegExp(
        /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d|\d{6})$/i,
      );
      handleNewAddress("postalCode", value.toUpperCase());
      handleNewAddress("validPostalCode", postalCodeRegex.test(e.target.value));
    }
  };

  const handlePlaceSelected = (place: any) => {
    const cityName =
      place.address_components[place.address_components.length - 4].long_name;
    handleNewAddress("address", place.formatted_address);
    handleNewAddress(
      "postalCode",
      place.address_components[place.address_components.length - 1].long_name,
    );
    handleNewAddress("city", cityName);
    handleNewAddress(
      "country",
      place.address_components[place.address_components.length - 2].long_name,
    );
    const province =
      place.address_components[place.address_components.length - 3].short_name;
    handleNewAddress("province", province);
    handleCitiesByStateName(province);
  };

  useEffect(() => {
    onAGoogleAddressDataChange(newAddress);
    console.log(newAddress);
  }, [newAddress]);

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol sizeMd="6" sizeXs="12">
            <IonItem lines="none">
              <IonIcon color="primary" icon={locationOutline} slot="start" />
              <IonLabel position="stacked">Address</IonLabel>
              <Autocomplete
                apiKey={config.googleApiKey}
                style={{
                  width: "100%",
                  height: 40,
                  border: "0px ",
                }}
                placeholder="Enter your address"
                debounce={500}
                options={{
                  types: ["geocode"],
                  componentRestrictions: {
                    country: ["ca", "co"],
                  },
                }}
                onPlaceSelected={handlePlaceSelected}
              />
            </IonItem>
          </IonCol>
          <IonCol sizeMd="6" sizeXs="12">
            <IonItem>
              <IonIcon color="primary" icon={locationOutline} slot="start" />
              <IonLabel position="floating">Postal Code</IonLabel>
              <IonInput
                color={
                  newAddress?.postalCode && newAddress?.postalCode?.length < 6
                    ? "dark"
                    : newAddress?.validPostalCode
                    ? "success"
                    : "danger"
                }
                required={true}
                autocomplete="on"
                type="text"
                value={newAddress?.postalCode}
                onIonChange={handlePostalCodeChange}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonGrid hidden={newAddress?.city ? false : true}>
        <IonLabel>Info de residencia</IonLabel>
        <IonRow>
          <IonCol size-md="6" size-xs="12">
            <FilterableList
              value={newAddress?.city || ""}
              items={cities}
              labelIcon={mapOutline}
              labelText="Ciudad"
              fieldToShow="name"
              choosenItem={(item: string) => {
                if (item && item.length > 4) {
                  handleNewAddress("neighborhood", undefined);
                  handleCity(item);
                }
              }}
              regexInput={"/^[a-zA-Z\\s]*$/"}
            />
          </IonCol>
          <IonCol size-md="6" size-xs="12">
            <FilterableList
              value={newAddress?.neighborhood?.firstName || ""}
              items={neighborhoods}
              fieldToShow="firstName"
              labelIcon={mapOutline}
              labelText="Nombre Conjunto"
              choosenItem={(item: string) => {
                handleNeighborhood(item);
              }}
              regexInput={"/^[a-zA-Z\\s]*$/"}
            />
          </IonCol>
        </IonRow>
        <IonRow hidden={newAddress?.neighborhood ? false : true}>
          <IonCol size-md="6" size-xs="12">
            <FilterableList
              fieldToShow="number"
              value={newAddress?.["propertyInfo.sectionNumber"]}
              items={generateNumberArray(
                1,
                Number(
                  newAddress?.neighborhood?.propertyInfo?.numberOfSections,
                ),
              )}
              labelIcon={businessOutline}
              labelText="Torre"
              choosenItem={(item: string) => {
                handleNewAddress("propertyInfo.sectionNumber", item);
              }}
              regexInput={"/[1-9]d{1}|1d{2}|2000/"}
            />
          </IonCol>
          <IonCol size-md="4" size-xs="12">
            <IonItem>
              <IonIcon color="primary" icon={homeOutline} slot="start" />
              <IonLabel position="floating">Apartamento</IonLabel>
              <IonInput
                minlength={2}
                maxlength={6}
                color="dark"
                required={true}
                autocomplete="on"
                type="tel"
                value={newAddress?.["propertyInfo.propertyNumber"]}
                onIonChange={(e: any) => {
                  const target = e.target as HTMLInputElement;
                  if (target && target?.value?.length <= 6) {
                    const value = target.value
                      .toString()
                      .replace(/[^0-9]/gi, "");
                    handleNewAddress("propertyInfo.propertyNumber", value);
                  }
                }}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default GoogleAddressContainer;
