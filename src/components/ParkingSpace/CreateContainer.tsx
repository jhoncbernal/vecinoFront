import React, { useCallback, useState } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonItem,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonButton,
  IonAlert,
  IonSelect,
  IonSelectOption,
  IonItemGroup,
  IonDatetime,
  IonGrid,
  IonRow,
  IonCol,
  IonInput
} from "@ionic/react";
import { pushOutline, listCircleOutline, createOutline } from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

interface ContainerProps {
  parkingType: string;
  dataChange:any;
}

const CreateContainer: React.FC<ContainerProps> = ({ parkingType,dataChange }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [LVStart, setLVStart] = useState<string>("00:00");
  const [LVEnd, setLVEnd] = useState<string>("00:00");

  const [SaStart, setSaStart] = useState<string>("00:00");
  const [SaEnd, setSaEnd] = useState<string>("00:00");

  const [SuStart, setSuStart] = useState<string>("00:00");
  const [SuEnd, setSuEnd] = useState<string>("00:00");

  const [message, setMessage] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [numPositions, setNumPositions] = useState();

  const handleSubmit = useCallback(
    async (e: any) => {
      try {
        e.preventDefault();
        let positions = [];
        if (numPositions > 0) {
          for (let index = 1; index <= numPositions; index++) {
            let pos = {
              posnumber: `${index}`,
              available: true,
              vehicletype: `${parkingType.substring(0, parkingType.length - 1)}`
            };
            positions.push(pos);
          }

          let pathUrl = `${config.ParkingSpaceContext}`;
          let data = {
            parkingname: parkingType,
            enabled: true,
            totalspace: 55,
            prices: [
              { kind: "Minute", value: "123" },
              { kind: "Hour", value: "3232" },
              { kind: "Day", value: "9432" }
            ],

            positions: positions,
            schedule: [
              { rank: "Lunes a Viernes", value: `${LVStart} a ${LVEnd}` },
              { rank: "Sabados", value: `${SaStart} a ${SaEnd}` },
              { rank: "Domingos", value: `${SuStart} a ${SuEnd}` }
            ]
          };
          if (!data) {
            setMessage("Debe seleccionar el tipo de parqueadero");
          } else {
            setShowProgressBar(true);
            await HttpRequest(pathUrl, "POST", data, true)
              .then(async (response: any) => {
                if(response){
                setMessage("Se creo Exitosamente el parqueadero");}
              })
              .catch(error => {
                throw error;
              });
          }
        } else {
          setMessage("No puede ser 0 la cantidad de estacionamientos");
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
    [numPositions, LVStart, LVEnd, SaStart, SaEnd, SuStart, SuEnd, parkingType]
  );
  return (
    <>
      <IonToolbar color="primary">
        <IonTitle>
          <h1>Crear Parqueadero</h1>
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
              <IonIcon
                color="primary"
                size="medium"
                icon={listCircleOutline}
                slot="start"
              />
              <IonLabel position="floating">Parqueadero para:</IonLabel>
              <IonSelect
                disabled
                defaultValue={parkingType}
                interface="popover"
                value={parkingType}
                placeholder="Seleccione uno"
              >
                <IonSelectOption value="Cars">Carros</IonSelectOption>
                <IonSelectOption value="Motorcycles">Motos</IonSelectOption>
                <IonSelectOption value="Bikes">Bicicletas</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonIcon color="primary" icon={createOutline} slot="start" />
              <IonLabel position="floating">
                Cantidad de estacionamientos
              </IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="off"
                type="number"
                value={numPositions}
                onIonChange={(e: any) => {
                  e.preventDefault();
                  setNumPositions(Number(e.target.value));
                }}
              />
            </IonItem>
            <IonItemGroup>
              <IonLabel>Horarios:</IonLabel>
              <IonItem>
                <IonGrid>
                  <IonLabel>Lunes a Viernes</IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Abre a:</IonLabel>
                        <IonDatetime
                          displayFormat="HH:mm"
                          value={LVStart}
                          onIonChange={e => setLVStart(e.detail.value!)}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Cierra a:</IonLabel>
                        <IonDatetime
                          displayFormat="HH:mm"
                          value={LVEnd}
                          onIonChange={e => setLVEnd(e.detail.value!)}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonLabel>Sabados</IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Abre a:</IonLabel>
                        <IonDatetime
                          displayFormat="HH:mm"
                          value={SaStart}
                          onIonChange={e => setSaStart(e.detail.value!)}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Cierra a:</IonLabel>
                        <IonDatetime
                          displayFormat="HH:mm"
                          value={SaEnd}
                          onIonChange={e => setSaEnd(e.detail.value!)}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonLabel>Domingos</IonLabel>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Abre a:</IonLabel>
                        <IonDatetime
                          displayFormat="HH:mm"
                          value={SuStart}
                          onIonChange={e => setSuStart(e.detail.value!)}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Cierra a:</IonLabel>
                        <IonDatetime
                          displayFormat="HH:mm"
                          value={SuEnd}
                          onIonChange={e => setSuEnd(e.detail.value!)}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonItemGroup>
            <IonProgressBar
              hidden={!showProgressBar}
              type="indeterminate"
            ></IonProgressBar>
            <br />
          </IonCard>
          <IonButton class="btn-login" type="submit">
            <IonIcon icon={pushOutline} slot="start" />
            Actualizar
          </IonButton>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Actualizacion"}
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

export default CreateContainer;
