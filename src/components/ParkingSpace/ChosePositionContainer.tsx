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
  IonSelectOption,
} from "@ionic/react";
import {
  personOutline,
  pushOutline,
  listCircleOutline,
  colorPaletteOutline,
  buildOutline,
  searchOutline,
  logOutOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

interface ContainerProps {
  dataModal: any;
  dataChange: any;
}

const ChosePosition: React.FC<ContainerProps> = ({ dataModal, dataChange }) => {
  const dataModall = useRef<any>(dataModal);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [bodyChange, setbodyChange] = useState(false);
  const [dataSend, setDataSend] = useState();
  const handleValueChange = useCallback(
    (property: string, value) => {
      try {
        setbodyChange(true);
        let body: any={};
        body[property] = value;
        setDataSend((prevState: any) => ({
          ...prevState,
          ...body,
        }));
      } catch (e) {
        console.error(e);
      }
    },
    []
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
          data = dataSend;
        }
        if (!bodyChange && !(dataModal.available === "false")) {
          setMessage("No se modifico ningun campo");
        } else {
          setShowProgressBar(true);
          await HttpRequest(pathUrl, "PATCH", data, true)
            .then(async (response: any) => {
              console.log(response, dataModall.current.available);
              if (
                dataModall.current.available === "true" &&
                response.status !== "the position: 1 now is available"
              ) {
                setMessage(
                  `Se asigno el vehiculo: ${dataSend["plate"]} a la posición ${dataModal.posnumber}`
                );
                setbodyChange(false);
              } else if (
                dataModall.current.available === "true" &&
                dataSend &&
                dataSend.plate
              ) {
                setMessage(
                  "No se encontro el vehiculo ingresado verifique la placa he intente nuevamente"
                );
              } else {
                setMessage(
                  `La posición ${dataModal.posnumber} se encuentra libre para asignar un vehiculo`
                );
                setbodyChange(false);
              }

              dataModall.current = response.result.positions[0];
            })
            .catch((error) => {
              if(error.message==="the plate is already asigned to other position"){
              setMessage(`No se puedea asignar debido a que la o el ${dataModal.vehicletype} con placa: ${dataSend["plate"]} se encuentra asignado en otra posiciòn`)}
              else{
                setMessage(`No se pudo asignar debido a :${error.message}`)}

              console.error(error);
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
    [dataModal.vehicletype, dataModal.posnumber, dataModal.available, bodyChange, dataSend]
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
          onSubmit={(e) => {
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
                    : dataSend?.plate
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
          buttons={[
            {
              text: "cancel",
              handler: async () => {
                if (!message.includes("No")) {
                  dataChange(true);
                }
              },
            },
            {
              text: "ok",
              handler: async () => {
                if (!message.includes("No")) {
                  dataChange(true);
                }
              },
            },
          ]}
        />
      </IonContent>
    </>
  );
};

export default ChosePosition;
