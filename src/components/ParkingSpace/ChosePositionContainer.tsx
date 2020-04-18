import React, { useCallback, useState, useRef } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonProgressBar,
  IonButton,
  IonAlert,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import {
  personOutline,
  pushOutline,
  listCircleOutline,
  colorPaletteOutline,
  buildOutline,
  searchOutline,
  logOutOutline
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

interface ContainerProps {
  dataModal: any;
}

const ChosePosition: React.FC<ContainerProps> = ({ dataModal }) => {
  let body: any = {};
  const dataModall = useRef<any>(dataModal);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [bodyChange, setbodyChange] = useState(false);
  const handleValueChange = useCallback(
    (property: string, value) => {
      try {
        setbodyChange(true);
        body[property] = value;
      } catch (e) {
        console.error(e);
      }
    },
    [body]
  );
  const handleSubmit = useCallback(
    async (e: any) => {
      try {
        e.preventDefault();
        let pathUrl = `${config.ParkingSpaceContext}/positions/${dataModal.vehicletype}s/${dataModal.posnumber}`;
        let data;
        if (dataModal.available === "false") {
          data = {};
        } else {
          data = body;
        }
        console.log(data);
        if (!bodyChange && !(dataModal.available === "false")) {
          setMessage("No se modifico ningun campo");
        } else {
          setShowProgressBar(true);
          await HttpRequest(pathUrl, "PATCH", data, true)
            .then(async (response: any) => {
              setMessage("Actualizacion Exitosa");
              setbodyChange(false);
              dataModall.current = response.result.positions[0];
            })
            .catch(error => {
              console.log(error);
              throw error;
            });
        }
        setShowProgressBar(false);
        setShowAlert(true);
      } catch (e) {
        setShowProgressBar(false);
        setShowAlert(true);
        setMessage(e);
        console.error(e);
      }
    },
    [
      bodyChange,
      dataModal.vehicletype,
      dataModal.posnumber,
      dataModal.available,
      body
    ]
  );
  return (
    <>
      <IonToolbar color="primary">
        <IonTitle>
          <h1>Estacionamiento #{dataModall.current.posnumber}</h1>
        </IonTitle>
      </IonToolbar>
      <IonContent>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
          action="post"
        >
          <IonCard class="card-center">
            <IonItem>
              <IonIcon color="primary" icon={personOutline} slot="start" />
              <IonLabel>Placa:</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="off"
                type="text"
                value={
                  dataModall.current.vehicle
                    ? dataModall.current.vehicle.plate
                    : ""
                }
                name="plate"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, e.target.value);
                }}
              />
              <IonButton size="default" color="secondary">
                <IonIcon icon={searchOutline} />
              </IonButton>
            </IonItem>
            <IonItem>
              <IonIcon
                color="primary"
                size="medium"
                icon={listCircleOutline}
                slot="start"
              />
              <IonLabel position="floating">Parqueadero para:</IonLabel>
              <IonSelect
                disabled
                interface="popover"
                value={
                  dataModall.current.vehicle
                    ? dataModall.current.vehicle.vehicletype
                    : ""
                }
                placeholder="Seleccione uno"
              >
                <IonSelectOption value="Car">Carro</IonSelectOption>
                <IonSelectOption value="Motorcycle">Moto</IonSelectOption>
                <IonSelectOption value="Bike">Bicicleta</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonIcon color="primary" icon={buildOutline} slot="start" />
              <IonLabel position="floating">Marca:</IonLabel>
              <IonInput
                color="dark"
                disabled
                required={true}
                autocomplete="off"
                type="text"
                value={
                  dataModall.current.vehicle
                    ? dataModall.current.vehicle.brand
                    : ""
                }
                name="brand"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, e.target.value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonIcon
                color="primary"
                icon={colorPaletteOutline}
                slot="start"
              />
              <IonLabel position="floating">Color:</IonLabel>
              <IonInput
                color="dark"
                disabled
                required={true}
                autocomplete="off"
                type="text"
                value={
                  dataModall.current.vehicle
                    ? dataModall.current.vehicle.color
                    : ""
                }
                name="color"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, e.target.value);
                }}
              />
            </IonItem>
            <IonProgressBar
              hidden={!showProgressBar}
              type="indeterminate"
            ></IonProgressBar>
            <br />
          </IonCard>
          {dataModall.current.available === "false" ? (
            <IonButton color="primary" class="btn-login" type="submit">
              <IonIcon icon={pushOutline} slot="start" />
              LIBERAR
            </IonButton>
          ) : (
              <IonButton color="danger" class="btn-login" type="submit">
                <IonIcon icon={logOutOutline} slot="start" />
                OCUPAR
            </IonButton>
            )}
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Asignacion"}
          subHeader={"respuesta:"}
          message={message}
          buttons={["OK"]}
        />
      </IonContent>
    </>
  );
};

export default ChosePosition;
