/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonLabel,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonText,
  IonToolbar,
} from "@ionic/react";
import {
  bookOutline,
  homeOutline,
  locationOutline,
  mapOutline,
} from "ionicons/icons";
import {
  TypesPosStreets,
  TypesOfStreets,
  neighborhoodsNotExist,
} from "./neighborhoodsNotExist";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

interface Address {
  address?:string;
  number?: number;
  post?: string;
  number2?: number;
  number3?: number;
  post2?: string;
  blockNumber?: number;
  homeNumber?: number;
  whereIlive?: string;
  city: string;
  uniquecode: string|undefined;
  neighborhood?: string|undefined;
  kind?: string;
  neighborhoodId:string;
  neighborhoods: Array<{
    firstName: string;
    uniquecode: string;
  }>;
}
interface ContainerProps {
  [id: string]: any;
}
const AddressContainer: React.FC<ContainerProps> = ({ accionTrigger,currentAddress }) => {
  const [address, setAddress] = useState<Address>();
  const [newAddres, setNewAddres] = useState<string>();
  useEffect(() => {
    async function fetchData() {
      let pathUrl = `${config.AllNeighborhoodsContext}`;
      await HttpRequest(pathUrl, "GET", "")
        .then((response: any) => {
          if(currentAddress){
            setAddress((prevState: any) => ({
              ...prevState,
              ...{neighborhoods: response , neighborhood: currentAddress.neighborhood,blockNumber:currentAddress.blockNumber,homeNumber:currentAddress.homeNumber,whereIlive:currentAddress.address?'Barrio':'Conjunto',uniquecode:currentAddress.uniquecode,city:currentAddress.city,address:currentAddress.address },
            }));
          }
          else{
          setAddress((prevState: any) => ({
            ...prevState,
            ...{ neighborhoods: response },
          }));}
        })
        .catch((error) => console.error("Error:", error));
    }
    fetchData();
    
  }, [currentAddress]);
  useEffect(() => {
    if (address) {
      let addressTemp:string='';
      if (address.whereIlive === "Conjunto") {
        addressTemp = `${address.neighborhood ? address.neighborhood : ""} 
                      ${address.blockNumber&&address.neighborhood ? address.blockNumber : ""} 
                      ${address.homeNumber&&address.neighborhood ? address.homeNumber : ""}
                      ${address.city ? address.city : ""}`;
     
      } else {
        addressTemp = `${address.neighborhood ? address.neighborhood : ""} ${
          address.kind ? address.kind : ""
        } ${address.number ? address.number : ""} ${
          address.post ? address.post : ""
        } ${address.number ? "No" : ""} ${
          address.number2 ? address.number2 : ""
        } ${address.number2 ? "-" : ""} ${
          address.number3 ? address.number3 : ""
        } ${address.post2 ? address.post2 : ""} ${
          address.city&&address.number3 ? address.city : ""
        }`;
      }
      
      if(addressTemp.trim()!==''){
      setNewAddres(addressTemp);}
      if (
        address.whereIlive &&
        ((address.blockNumber && address.homeNumber) ||( address.number3&&address.kind))
      ) {
        accionTrigger({
          whereIlive: address.whereIlive,
          uniquecode: address.uniquecode,
          blockNumber: address.blockNumber,
          homeNumber: address.homeNumber,
          address: addressTemp,
          city:address.city,
          neighborhoodId:address.neighborhoodId
        });
      }
    
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      {address ? (
        <IonGrid>
          <IonLabel>Info de recidencia</IonLabel>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonIcon color="primary" icon={mapOutline} slot="start" />
                <IonLabel position='stacked'>Ciudad</IonLabel>
                <IonSelect
                  interface="popover"
                  color="dark"
                  placeholder={currentAddress?currentAddress.city?currentAddress.city:"Ciudad de recidencia":''}
                  onIonChange={(e: any) =>
                    setAddress((prevState: any) => ({
                      ...prevState,
                      ...{ city: e.target.value },
                    }))
                  }
                >
                  <IonSelectOption value={'Madrid Cundinamarca'}>Madrid Cundinamarca</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonToolbar>
                <IonLabel position="stacked">
                  Seleccione en que tipo de sector vive:
                </IonLabel>
                <IonSegment
                  value={address.whereIlive}
                  onIonChange={(e: any) => {
                    setAddress((prevState: any) => ({
                      ...prevState,
                      ...{ whereIlive: e.detail.value },
                    }));
                    setAddress((prevState: any) => ({
                      ...prevState,
                      ...{
                        uniquecode: undefined,
                      },
                    }));
                    setAddress((prevState: any) => ({
                      ...prevState,
                      ...{
                        neighborhood: undefined,
                      },
                    }));
                  }}
                >
                  <IonSegmentButton value="Conjunto">
                    <IonLabel>Conjunto</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="Barrio">
                    <IonLabel>Barrio</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonToolbar>
            </IonCol>
          </IonRow>
          {address.whereIlive ? (
            <>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonIcon color="primary" icon={bookOutline} slot="start" />
                    <IonLabel position='stacked'>{"Seleccione un " + address.whereIlive}</IonLabel>
                    <IonSelect
                      interface="popover"
                      color="dark"
                      placeholder={currentAddress&&address.whereIlive==='Conjunto'?currentAddress.neighborhood:""}
                      onIonChange={(e: any) => {
                        setAddress((prevState: any) => ({
                          ...prevState,
                          ...{
                            uniquecode: e.target.value.uniquecode,
                          },
                        }));
                        setAddress((prevState: any) => ({
                          ...prevState,
                          ...{
                            neighborhood: e.target.value.firstName,
                          },
                        }));
                        if(e.target.value._id){
                          setAddress((prevState: any) => ({
                            ...prevState,
                            ...{
                              neighborhoodId: e.target.value._id,
                            },
                          }));
                        }
                      }}
                    >
                      {(address.whereIlive === "Conjunto"
                        ? address.neighborhoods
                        : neighborhoodsNotExist
                      ).map((neighborhood, index) => {
                        if (neighborhood.firstName !== "No esta en la lista") {
                          return (
                            <IonSelectOption key={index} value={neighborhood}>
                              {neighborhood.firstName}
                            </IonSelectOption>
                          );
                        }
                      })}
                      )
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
              {address.whereIlive === "Conjunto" ? (
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={homeOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">Torre</IonLabel>
                      <IonInput
                        minlength={1}
                        maxlength={3}
                        color="dark"
                        required={true}
                        type="tel"
                        value={address.blockNumber}
                        onIonChange={(e: any) =>
                          setAddress((prevState: any) => ({
                            ...prevState,
                            ...{ blockNumber: e.target.value },
                          }))
                        }
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={homeOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">Apartamento</IonLabel>
                      <IonInput
                        minlength={2}
                        maxlength={6}
                        color="dark"
                        required={true}
                        autocomplete="on"
                        type="tel"
                        value={address.homeNumber}
                        onIonChange={(e: any) =>
                          setAddress((prevState: any) => ({
                            ...prevState,
                            ...{ homeNumber: e.target.value },
                          }))
                        }
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              ) : (
                <>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonLabel position="stacked">
                    <p>
                      <small>Ejemplo:</small>
                    </p>
                  </IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Calle (*)</IonLabel>
                        <IonSelect
                          interface="popover"
                          color="dark"
                          value={address.kind}
                          onIonChange={(e: any) => {
                            setAddress((prevState: any) => ({
                              ...prevState,
                              ...{ kind: e.target.value },
                            }));
                          }}
                        >
                          {TypesOfStreets.map((kind, index) => (
                            <IonSelectOption key={index} value={kind}>
                              {kind}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">6a (*)</IonLabel>
                        <IonInput
                          minlength={1}
                          maxlength={4}
                          color="dark"
                          required={true}
                          autocomplete="off"
                          type="tel"
                          value={address.number}
                          onIonChange={(e: any) => {
                            setAddress((prevState: any) => ({
                              ...prevState,
                              ...{ number: e.target.value },
                            }));
                          }}
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Sur </IonLabel>
                        <IonSelect
                          interface="popover"
                          color="dark"
                          value={address.post}
                          onIonChange={(e: any) => {
                            if (e.target.value === "No Aplica") {
                              setAddress((prevState: any) => ({
                                ...prevState,
                                ...{ post: "" },
                              }));
                            } else {
                              setAddress((prevState: any) => ({
                                ...prevState,
                                ...{ post: e.target.value },
                              }));
                            }
                          }}
                        >
                          {TypesPosStreets.map((kind, index) => (
                            <IonSelectOption key={index} value={kind}>
                              {kind}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                    <IonLabel position="stacked"> No. </IonLabel>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">25c(*)</IonLabel>
                        <IonInput
                          minlength={1}
                          maxlength={4}
                          color="dark"
                          required={true}
                          autocomplete="off"
                          type="tel"
                          value={address.number2}
                          onIonChange={(e: any) => {
                            setAddress((prevState: any) => ({
                              ...prevState,
                              ...{ number2: e.target.value },
                            }));
                          }}
                        />
                      </IonItem>
                    </IonCol>
                    <IonLabel position="stacked">
                      <h1> - </h1>
                    </IonLabel>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">65(*)</IonLabel>
                        <IonInput
                          minlength={1}
                          maxlength={4}
                          color="dark"
                          required={true}
                          autocomplete="off"
                          type="tel"
                          value={address.number3}
                          onIonChange={(e: any) => {
                            setAddress((prevState: any) => ({
                              ...prevState,
                              ...{ number3: e.target.value },
                            }));
                          }}
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Este </IonLabel>
                        <IonSelect
                          interface="popover"
                          color="dark"
                          value={address.post2}
                          onIonChange={(e: any) => {
                            if (e.target.value === "No Aplica") {
                              setAddress((prevState: any) => ({
                                ...prevState,
                                ...{ post2: "" },
                              }));
                            } else {
                              setAddress((prevState: any) => ({
                                ...prevState,
                                ...{ post2: e.target.value },
                              }));
                            }
                          }}
                        >
                          {TypesPosStreets.map((kind, index) => (
                            <IonSelectOption key={index} value={kind}>
                              {kind}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </>
              )}
              <IonRow>
                <IonCol size={"12"}>
                  <IonItem>
                    <IonIcon
                      color="primary"
                      icon={locationOutline}
                      slot="start"
                    />
                    <IonLabel position="stacked">Dirección Generada:</IonLabel>
                    <IonText>{currentAddress?currentAddress.address&&!newAddres!?currentAddress.address: newAddres:newAddres}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
            </>
          ) : null}
        </IonGrid>
      ) : null}
    </>
  );
};

export default AddressContainer;
