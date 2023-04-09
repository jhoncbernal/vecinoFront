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
  const [cities, setCities] = useState<Array<{ name: string }>>();
  const [neighborhoods, setNeighborhoods] = useState<Array<Neighborhood>>();
  const [state, setState] = useState<string>();
  const handleNewAddress = (propertyName: string, value: any) => {
    setNewAddress((prevState: any) => ({
      ...prevState,
      ...{
        [propertyName]: value,
      },
    }));
  };
  async function fetchNeighborhoodsByCityName(city: string) {
    try {
      const pathUrl = `${config.AdminContext}/city/${city}`;
      const response: any = await HttpRequest(pathUrl, "GET", "");
      if (response.length > 0) {
        setNeighborhoods(response);
        const nei = response?.filter(
          (neighborhood: any) =>
            neighborhood.postalCode === newAddress?.postalCode,
        );
        handleNewAddress("neighborhood", nei[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function fetchCitiesByState(currentState: string) {
    try {
      if (currentState && state !== currentState) {
        const pathUrl = `${config.CityContex}/state/name/${currentState}?pageNum=1&pageSize=500`;
        const response: any = await HttpRequest(pathUrl, "GET", "");
        if (response.length > 0) {
          setState(currentState);
          setCities(response);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (newAddress?.province) {
      fetchCitiesByState(newAddress?.province);
    }
  }, [newAddress?.province]);

  function generateNumberArray(start: number, end: number): string[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => String(start + i));
  }
  const handleNeighborhood = (item: string) => {
    const neighbor = neighborhoods?.filter(
      (neighborhood) => neighborhood.firstName === item,
    );
    if (neighbor && neighbor?.length > 0) {
      handleNewAddress("neighborhood", neighbor[0]);
    }
  };
  useEffect(() => {
    if (newAddress?.city) fetchNeighborhoodsByCityName(newAddress?.city);
  }, [newAddress?.city]);
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
  const handleGetCity = async (city: string) => {
    const pathUrl = `${config.CityContex}/name/${city}`;
    const response = await HttpRequest(pathUrl, "GET");
    if (response) {
      handleNewAddress("city", response[0]?.name);
      handleNewAddress("cityCode", response[0]?.code);
      handleNewAddress("countryCode", response[0]?.countryCode);
      handleNewAddress("stateCode", response[0]?.stateCode);
    }
  };
  const handlePlaceSelected = (place: any) => {
    const cityName =
      place.address_components[place.address_components.length - 4].long_name;
    handleGetCity(cityName);
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
    handleNewAddress(
      "province",
      place.address_components[place.address_components.length - 3].short_name,
    );
  };
  useEffect(() => {
    onAGoogleAddressDataChange(newAddress);
  }, [newAddress]);
  useEffect(() => {
    if (clearData) {
      setNewAddress(undefined);
      setCities(undefined);
      setNeighborhoods(undefined);
      setState(undefined);
    }
  }, [clearData]);
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
              items={cities?.map((city: any) => city.name) || [""]}
              labelIcon={mapOutline}
              labelText="Ciudad"
              choosenItem={(item: string) => {
                handleNewAddress("neighborhood", undefined);
                fetchNeighborhoodsByCityName(item);
              }}
              regexInput={"/^[a-zA-Z\\s]*$/"}
            />
          </IonCol>
          <IonCol size-md="6" size-xs="12">
            <FilterableList
              value={newAddress?.neighborhood?.firstName || ""}
              items={
                neighborhoods?.map(
                  (neighborhood: any) => neighborhood.firstName,
                ) || [""]
              }
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
              value={newAddress?.propertyInfo?.sectionNumber || ""}
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
                value={newAddress?.propertyInfo?.propertyNumber}
                onIonChange={(e: any) => {
                  const target = e.target as HTMLInputElement;
                  if (target && target?.value?.length <= 6) {
                    const value = target.value
                      .toString()
                      .replace(/[^0-9]/gi, "");
                    handleNewAddress(
                      "propertyInfo.propertyNumber",
                      value ? value : "",
                    );
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
