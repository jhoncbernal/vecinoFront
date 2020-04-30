import React, { useCallback, useState, useEffect } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonAlert,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAvatar,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

interface ContainerProps {
  dataModal: any;
}

const BestListContainer: React.FC<ContainerProps> = ({ dataModal }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [dataModall, setdataModall] = useState([{}]);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const handleSubmit = useCallback(async () => {
    try {
      let pathUrl = `${config.UserContext}/bestpoints/1`;

      let data;
      setShowProgressBar(true);
      await HttpRequest(pathUrl, "GET", data, true)
        .then(async (response: any) => {
          setdataModall(response);
          setShowProgressBar(false);
          setMessage("Mejores puntajes");
        })
        .catch((error) => {
          throw error;
        });

      setShowProgressBar(false);
      setShowAlert(true);
    } catch (e) {
      setShowProgressBar(false);
      setShowAlert(true);
      setMessage(e);
      console.error(e);
    }
  }, []);
  useEffect(() => {
    handleSubmit();
  }, [dataModal, handleSubmit]);

  return (
    <>
      <IonToolbar color="primary">
        <IonTitle>
          <h1>Mejores Puntajes</h1>
        </IonTitle>
      </IonToolbar>
      <IonContent>
        <IonList>
          {dataModall.map((input: any, index: string | number | undefined) => {
            return (
              <IonItemSliding key={index}>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonIcon
                      class="icon-avatar"
                      size="large"
                      color={Number(input.debt) > 0 ? "danger" : "primary"}
                      src={personOutline}
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2>
                      {input ? input.firstName : ""}
                      {input ? input.lastName : ""}
                    </h2>
                    <h3>{input ? input.email : ""}</h3>
                    <p>{input ? input.phone : ""}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => {}}>Unread</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
          <IonProgressBar
            hidden={!showProgressBar}
            type="indeterminate"
          ></IonProgressBar>
          <br />
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Actualizacion"}
          subHeader={"respuesta:"}
          message={message}
          buttons={["OK"]}
        />
      </IonContent>
    </>
  );
};

export default BestListContainer;
