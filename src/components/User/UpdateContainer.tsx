import React, { useCallback, useState, useEffect } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonCol,
  IonRow,
  IonGrid,
  IonToggle,
  IonProgressBar,
  IonButton,
  IonAlert,
} from "@ionic/react";
import {
  personOutline,
  phonePortraitOutline,
  mailOpenOutline,
  cardOutline,
  bulbOutline,
  pushOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import { Storages } from "../../hooks/Storage";
import config from "../../config";
import { User } from "../../entities";
import AddressContainer from "../Auth/AddressContainer";

interface ContainerProps {
  dataModal: any;
  triggerChange: any;
}

const UpdateUser: React.FC<ContainerProps> = ({ dataModal, triggerChange }) => {
  let body: any = {};
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [dataModall, setdataModall] = useState<User>(dataModal);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [bodyChange, setbodyChange] = useState(false);
  const handleValueChange = useCallback(
    (property: string, value) => {
      try {
        if (value !== undefined || value !== "") {
          setbodyChange(true);
          body[property] = value;
        }
      } catch (e) {
        console.error(e);
      }
    },
    [body]
  );
  const handleSubmit = useCallback(
    async (e: any) => {
      try {
        const { setObject } = Storages();
        e.preventDefault();
        let pathUrl = ``;
        if (dataModal.roles.includes(config.RolUserAccess)) {
          pathUrl = `${config.UserContext}/${dataModal._id}`;
        } else if (dataModal.roles.includes(config.RolAdminAccess)) {
          pathUrl = `${config.AdminContext}/${dataModal._id}`;
        } else {
          pathUrl = `${config.ProviderContext}/${dataModal._id}`;
        }
        let data = body;
        if (!bodyChange) {
          setMessage("No se modifico ningun campo");
        } else {
          setShowProgressBar(true);
          await HttpRequest(pathUrl, "PATCH", data, true)
            .then(async (response: any) => {
              setMessage("Actualizacion Exitosa");
              setbodyChange(false);
              setdataModall(response);
              await setObject("user", response);
            })
            .catch((error) => {
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
    [dataModal.roles, dataModal._id, body, bodyChange]
  );
  useEffect(() => {
    setdataModall(dataModal);
  }, [dataModal]);
  return (
    <IonContent>
      <IonToolbar color="primary">
        <IonTitle>
          <h1>Actualizar datos</h1>
        </IonTitle>
      </IonToolbar>
      <>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          action="post"
        >
          <IonCard class="card-center">
            <IonItem>
              <IonIcon color="primary" icon={personOutline} slot="start" />
              <IonLabel position="floating">Nombre de usuario</IonLabel>
              <IonInput
                disabled
                color="dark"
                required={true}
                autocomplete="off"
                type="text"
                value={dataModall ? dataModall.username : ""}
              />
            </IonItem>
            <IonItem>
              <IonIcon color="primary" icon={mailOpenOutline} slot="start" />
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="off"
                type="email"
                value={dataModall ? dataModall.email : ""}
                name="email"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, e.target.value);
                }}
              />
            </IonItem>
            <IonItem>
              <IonIcon
                color="primary"
                icon={phonePortraitOutline}
                slot="start"
              />
              <IonLabel position="floating">Telefono</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="off"
                type="number"
                value={dataModall ? dataModall.phone : ""}
                name="phone"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, Number(e.target.value));
                }}
              />
            </IonItem>
            <IonGrid>
              <IonLabel>Nombre completo</IonLabel>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonIcon
                      color="primary"
                      icon={personOutline}
                      slot="start"
                    />
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput
                      color="dark"
                      required={true}
                      autocomplete="off"
                      type="text"
                      value={dataModall ? dataModall.firstName : ""}
                      name="firstName"
                      onIonChange={(e: any) => {
                        handleValueChange(e.target.name, e.target.value);
                      }}
                    />
                  </IonItem>
                </IonCol>
                <IonCol
                  hidden={
                    dataModall
                      ? dataModal.roles.includes("ROLE_USER_ACCESS")
                        ? false
                        : true
                      : false
                  }
                >
                  <IonItem>
                    <IonIcon
                      color="primary"
                      icon={personOutline}
                      slot="start"
                    />
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput
                      color="dark"
                      autocomplete="off"
                      type="text"
                      value={dataModall ? dataModall.lastName : ""}
                      name="lastName"
                      onIonChange={(e: any) => {
                        handleValueChange(e.target.name, e.target.value);
                      }}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid
              hidden={
                dataModall
                  ? dataModal.roles.includes(config.RolUserAccess)
                    ? false
                    : true
                  : false
              }
            >
              <AddressContainer
                currentAddress={
                  dataModall
                    ? {
                        homeNumber: dataModall.homeNumber,
                        blockNumber: dataModall.blockNumber,
                        neighborhood: dataModall.neighborhood&&!dataModall.address?dataModall.neighborhood.firstName:'',
                        uniquecode: dataModall.uniquecode,
                        address: dataModall.address,
                        city: dataModall.city,
                      }
                    : null
                }
                accionTrigger={(response: any) => {
                  if (response.whereIlive) {
                    if (response.city !== dataModall.city) {
                      handleValueChange("city", response.city);
                    }
                    if (response.uniquecode !== dataModall.uniquecode) {
                      handleValueChange("uniquecode", response.uniquecode);
                    }
                    if (
                      response.homeNumber &&
                      response.blockNumber &&
                      response.whereIlive === "Conjunto"
                    ) {
                      if (response.homeNumber !== dataModall.homeNumber) {
                        handleValueChange("homeNumber", response.homeNumber);
                      }
                      if (response.blockNumber !== dataModall.blockNumber) {
                        handleValueChange("blockNumber", response.blockNumber);
                      }
                      if (
                        response.neighborhoodId !== dataModall.neighborhood &&
                        response.neighborhoodId
                      ) {
                        handleValueChange(
                          "neighborhood",
                          response.neighborhoodId
                        );
                        handleValueChange("address", '');
                      }
                    }
                    if (response.address && response.whereIlive === "Barrio") {
                      if (response.address !== dataModall.address) {
                        handleValueChange("address", response.address);
                      }
                    }
                  }
                }}
              ></AddressContainer>
            </IonGrid>
            <IonItem>
              <IonIcon color="primary" icon={cardOutline} slot="start" />
              <IonLabel position="floating">Numero de identificación</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="off"
                type="number"
                value={dataModall ? dataModall.documentId : ""}
                name="documentId"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, Number(e.target.value));
                }}
              />
            </IonItem>
            <IonItem
              hidden={true
              }
            >
              <IonIcon color="primary" icon={bulbOutline} slot="start" />
              <IonLabel>Habilitar usuario</IonLabel>
              <IonToggle
                checked={dataModall ? dataModall.enabled : false}
                name="enabled"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name.toString(), e.detail.checked);
                }}
              />
            </IonItem>
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
              text: "",
              role: "",
              cssClass: "secondary",
            },
            {
              text: "Confirmar",
              handler: async () => {
                try {
                 triggerChange(true)
                } catch (e) {
                  console.error("HomePage.handler: " + e);
                }
              },
            },
          ]}
        />
      </>
    </IonContent>
  );
};

export default UpdateUser;
