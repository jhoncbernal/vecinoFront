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
  businessOutline,
  homeOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import { Storages } from "../../hooks/Storage";
import config from "../../config";
import { User } from "../../entities";
import AddressContainer from "../Auth/AddressContainer";

interface ContainerProps {
  dataModal: User;
  triggerChange: any;
  currentUser?: User;
}

const UpdateUser: React.FC<ContainerProps> = ({
  dataModal,
  triggerChange,
  currentUser,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [dataModall, setdataModall] = useState<User>(dataModal);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [bodyChange, setbodyChange] = useState(false);
  const [dataSend, setDataSend] = useState();
  const handleValueChange = useCallback((property: string, value:any) => {
    try {
      setbodyChange(true);
      let body: any = {};
      body[property] = value;
      setDataSend((prevState: any) => ({
        ...prevState,
        ...body,
      }));
    } catch (e) {
      console.error(e);
    }
  }, []);
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
        let data = dataSend;
        console.log(data)
        if (!bodyChange) {
          setMessage("No se modifico ningun campo");
        } else {
          setShowProgressBar(true);
          await HttpRequest(pathUrl, "PATCH", data, true)
            .then(async (response: any) => {
              setMessage("Actualizacion Exitosa");
              setbodyChange(false);
              setdataModall(response);
              if(!currentUser){
                await setObject("user", response);
              }
            
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
    [dataModal.roles, dataModal._id, dataSend, bodyChange, currentUser]
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
                value={dataSend?.email ? dataSend["email"] : dataModall?.email}
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
                value={dataSend?.phone ? dataSend["phone"] : dataModall?.phone}
                name="phone"
                onIonChange={(e: any) => {
                  handleValueChange(
                    e.target.name,
                    Number(e.target.value?.toString().replace(/[^0-9]/gi, ""))
                  );
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
                      value={
                        dataSend?.firstName
                          ? dataSend["firstName"]
                          : dataModall?.firstName
                      }
                      name="firstName"
                      onIonChange={(e: any) => {
                        handleValueChange(
                          e.target.name,
                          e.target.value.replace(/[^A-Za-z ñ]/gi, "")
                        );
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
                      value={
                        dataSend?.lastName
                          ? dataSend["lastName"]
                          : dataModall?.lastName
                      }
                      name="lastName"
                      onIonChange={(e: any) => {
                        handleValueChange(
                          e.target.name,
                          e.target.value.replace(/[^A-Za-z ñ]/gi, "")
                        );
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
              {currentUser?.roles.includes(config.RolAdminAccess) ? (
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonIcon
                          color="primary"
                          icon={businessOutline}
                          slot="start"
                        />
                        <IonLabel position="floating">Torre</IonLabel>
                        <IonInput
                          minlength={1}
                          maxlength={3}
                          color="dark"
                          required={true}
                          type="tel"
                          name={"blockNumber"}
                          value={
                            dataSend?.blockNumber
                              ? dataSend["blockNumber"]
                              : dataModall?.blockNumber
                          }
                          onIonChange={(e: any) => {
                            handleValueChange(
                              e.target.name,
                              e.target.value.toString().replace(/[^0-9]/gi, "")
                            );
                          }}
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
                          name={"homeNumber"}
                          value={
                            dataSend?.homeNumber
                              ? dataSend["homeNumber"]
                              : dataModall?.homeNumber
                          }
                          onIonChange={(e: any) => {
                            handleValueChange(
                              e.target.name,
                              e.target.value.toString().replace(/[^0-9]/gi, "")
                            );
                          }}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              ) : (
                <AddressContainer
                  currentAddress={
                    dataModall
                      ? {
                          homeNumber: dataModall.homeNumber,
                          blockNumber: dataModall.blockNumber,
                          neighborhood:
                            dataModall.neighborhood && !dataModall.address
                              ? dataModall.neighborhood.firstName
                              : "",
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
                          handleValueChange(
                            "blockNumber",
                            response.blockNumber
                          );
                        }
                        if (
                          response.neighborhoodId !== dataModall.neighborhood &&
                          response.neighborhoodId
                        ) {
                          handleValueChange(
                            "neighborhood",
                            response.neighborhoodId
                          );
                          handleValueChange("address", "");
                        }
                      }
                      if (
                        response.address &&
                        response.whereIlive === "Barrio"
                      ) {
                        if (response.address !== dataModall.address) {
                          handleValueChange("address", response.address);
                        }
                      }
                    }
                  }}
                ></AddressContainer>
              )}
            </IonGrid>
            <IonItem>
              <IonIcon color="primary" icon={cardOutline} slot="start" />
              <IonLabel position="floating">Numero de identificación</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="off"
                type="number"
                value={
                  dataSend?.documentId
                    ? dataSend["documentId"]
                    : dataModall?.documentId
                }
                name="documentId"
                onIonChange={(e: any) => {
                  handleValueChange(
                    e.target.name,
                    Number(e.target.value.toString().replace(/[^0-9]/gi, ""))
                  );
                }}
              />
            </IonItem>
            <IonItem hidden={currentUser?.roles.includes(config.RolAdminAccess)?false:true}>
              <IonIcon color="primary" icon={bulbOutline} slot="start" />
              <IonLabel>Habilitar usuario</IonLabel>
              <IonToggle
                checked={dataSend?.enabled!==undefined
                  ? dataSend["enabled"]
                  : dataModall?.enabled}
                name="enabled"
                onIonChange={(e: any) => {
                  handleValueChange(e.target.name, e.detail.checked);
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
                  triggerChange(true);
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
