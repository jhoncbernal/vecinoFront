import React, { useState, useCallback, useEffect } from "react";
import { IonItem, IonIcon, IonCard, IonAvatar, IonSearchbar, IonModal, IonFab, IonFabButton, IonLabel, IonCardTitle, IonItemDivider, IonButton, IonCardContent, IonCardHeader, IonText, IonInput } from "@ionic/react";
import { arrowBackOutline, carSportOutline, closeCircle, checkmarkCircle, bicycleOutline } from "ionicons/icons";
import "./ListContainer.css";
import CreateContainer from "./CreateContainer";
import ChosePosition from "./ChosePositionContainer";
import * as H from "history";
import config from "../../config";
import { User } from "../../entities";
interface ContainerProps {
  parkingType: string;
  loaddata: boolean;
  inputs: Array<any>;
  history: H.History;
  dataChanges: any;
  currentUser: User;
}

const ListContainer: React.FC<ContainerProps> = ({ parkingType, loaddata, inputs,dataChanges,currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [data, setdata] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [positionData, setPositionData] = useState();
  const handleSearch = useCallback(
    async (e: any) => {
      setdata(inputs);
      setSearchText(e.detail.value!);
      if (searchText === "") {
        setdata([{}]);
      } else {
        const newData = inputs.filter((item: any) => {
          let itemData = `P${item.posnumber.toUpperCase()} ${item.available.toUpperCase()}`;
          if (item.vehicle) {
            itemData = itemData + `${item.vehicle.plate.toUpperCase()}
        ${item.vehicle.brand.toUpperCase()}
        ${item.vehicle.color.toUpperCase()}`;
          }
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setdata(newData);
      }

    }, [inputs, searchText]);
  useEffect(() => {
    setSearchText("");
    setdata([{}]);
  }, [parkingType]);
  try {
    if (inputs.length > 1) {
      return (
        <>
          <IonSearchbar animated={true} value={searchText} onIonChange={(e) => {
            e.preventDefault();
            handleSearch(e);
          }}
            showCancelButton="always" hidden={!loaddata}></IonSearchbar>
          {data.map((input: any, index: any) => {
            if (!input.posnumber) {
              return (<IonCard key={index}></IonCard>);
            }
            return (
              <IonCard key={index} >
                <IonCardHeader color={input.available === "false" ? "danger" : "primary"}>
                  <IonCardTitle class='title'>
                    <IonText>
                      {input.available !== "false"
                        ? <IonIcon size='medium' icon={checkmarkCircle} />
                        : <IonIcon size='medium' icon={closeCircle} />
                      }  P{input.posnumber}  </IonText>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent onClick={() => { setShowModal(true); setPositionData(input); }}>
                  <IonItemDivider>
                    <IonAvatar color='primary'>
                      {input.vehicletype === "Motorcycle"
                        ? <IonIcon class='icon-avatar' size='large' src={"assets/icons/Motorcycle.svg"} />
                        : <></>
                      }
                      {input.vehicletype === "Car"
                        ? <IonIcon class='icon-avatar' size='large' src={carSportOutline} />
                        : <></>
                      }
                      {input.vehicletype === "Bike"
                        ? <IonIcon class='icon-avatar' size='large' src={bicycleOutline} />
                        : <></>
                      }
                    </IonAvatar>
                    {input.vehicle
                      ? <><IonItem><IonLabel position="stacked">Placa: </IonLabel><IonInput disabled color='dark'>{input.vehicle.plate}</IonInput></IonItem>
                        <IonItem><IonLabel position="stacked">Marca: </IonLabel><IonInput disabled color='dark'>{input.vehicle.brand}</IonInput></IonItem>
                        <IonItem><IonLabel position="stacked">Color: </IonLabel><IonInput disabled color='dark'>{input.vehicle.color}</IonInput></IonItem></>
                      : <></>
                    }
                  </IonItemDivider>
                </IonCardContent>
                <IonModal  isOpen={showModal} animated={true}  onDidDismiss={() => setShowModal(false)} >
                  <ChosePosition dataModal={positionData} dataChange={(dat: boolean)=>{setShowModal(false);dataChanges(dat);setSearchText(""); setdata([{}]);}}></ChosePosition>
                  <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={() => {
                      setShowModal(false); 
                    }} >
                    <IonIcon icon={arrowBackOutline} /></IonFabButton>
                  </IonFab>
                </IonModal>
              </IonCard>
            );
          })}
        </>
      );
    } else {
      return (<> <IonButton expand="block" hidden={!loaddata} onClick={() => { if(!currentUser.roles?.includes(config.RolSecurityAccess)){setShowModal2(true);} }}>
        Crear Parqueadero
      <IonIcon slot="end" icon={checkmarkCircle} />
      </IonButton>
        <IonModal isOpen={showModal2} animated={true}   onDidDismiss={() => setShowModal2(false)} >
          <CreateContainer parkingType={parkingType} dataChange={(dat: boolean)=>{setShowModal(false);dataChanges(dat);setSearchText(""); setdata([{}]);}}></CreateContainer>
          <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={() => {
                      setShowModal2(false); 
                    }} >
                    <IonIcon icon={arrowBackOutline} /></IonFabButton>
                  </IonFab>
        </IonModal></>);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default ListContainer;
