import React, { useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonFabList,
  IonAlert,
  IonText,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import {
  menuSharp,
  buildSharp,
  carSportSharp,
  logOutSharp,
  cardSharp,
  documentTextSharp,
  arrowBackOutline,
  helpBuoy,
} from "ionicons/icons";
import { FileFormPage } from "./File/FileFormContainer";
import UpdateUser from "./User/UpdateContainer";

import BestListContainer from "./User/BestListContainer";
import { updateToken } from "../hooks/UpdateToken";
import config from "../config";
import { User } from "../entities";
import * as H from "history";
import { logout } from "../hooks/Auth";
interface ContainerProps {
  history: H.History;
  currentUser: User;
}
const FloatingButtonsMenu: React.FC<ContainerProps> = ({
  history,
  currentUser,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dataModal, setdataModal] = useState();
  const [fabButtonValue, setFabButtonValue] = useState("");

  return (
    <>
      <div>
        <IonFab horizontal="end" vertical="top" slot="fixed">
          <IonFabButton>
            <IonIcon icon={menuSharp} />
          </IonFabButton>
          <IonFabList side="bottom">
            {currentUser.roles ? (
              currentUser.roles?.includes(config.RolAdminAccess) &&
              !currentUser.roles?.includes(config.RolSecurityAccess) ? (
                <>
                  <IonFabButton
                    hidden={true}
                    color="primary"
                    onClick={() => {
                      setFabButtonValue("bestPoints");
                      setShowModal(true);
                    }}
                  >
                    <IonIcon icon={carSportSharp} />
                  </IonFabButton>
                  <IonFabButton
                    onClick={() => {
                      setFabButtonValue("document");
                      setShowModal(true);
                    }}
                    color="primary"
                  >
                    <IonIcon icon={documentTextSharp} />
                  </IonFabButton>
                  <IonFabButton color="primary">
                    <IonIcon
                      icon={cardSharp}
                      onClick={() => {
                        setFabButtonValue("payment");
                        setShowModal(true);
                      }}
                    />
                  </IonFabButton>
                </>
              ) : null
            ) : null}
            <IonFabButton
              onClick={() => {
                setFabButtonValue("config");
                setShowModal(true);
                setdataModal(currentUser);
              }}
              color="primary"
            >
              <IonIcon icon={buildSharp} />
            </IonFabButton>
            <IonFabButton   color="primary" type="button"  data-toggle="collapse" href="https://api.whatsapp.com/send?phone=573204485942"
            data-target="#landx-navigation"> <IonIcon src={helpBuoy}></IonIcon></IonFabButton>
            <IonFabButton color="dark"  onClick={() => setShowAlert(true)}>
              <IonIcon color="primary" icon={logOutSharp} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Cerrar sesión"}
          message={"¿Esta seguro?"}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Confirmar",
              handler: async () => {
                try {
                  updateToken("");
                  logout();
                  history.push("/login");
                } catch (e) {
                  console.error("HomePage.handler: " + e);
                }
              },
            },
          ]}
        />
      </div>

      <IonModal backdropDismiss={false} isOpen={showModal} animated={true}>
        <IonContent>
          {fabButtonValue === "document" ? (
            <FileFormPage history={history}></FileFormPage>
          ) : fabButtonValue === "config" ? (
            <UpdateUser
              dataModal={dataModal}
              triggerChange={(response: boolean) => {
                response ? history.go(0) : console.error(response);
              }}
            ></UpdateUser>
          ) : fabButtonValue === "bestPoints" ? (
            <BestListContainer dataModal={dataModal}></BestListContainer>
          ) : fabButtonValue === "payment" ? (
            <IonCard disabled>
              <IonCardContent>
                <IonText color="primary">
                  <h1>
                    En el futuro aca podra realizar sus pagos de administracion
                  </h1>
                  <p>Esperelo muy pronto!</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          ) : null}
        </IonContent>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton
            onClick={async () => {
              setShowModal(false);
              setdataModal(false);
              history.goForward();
            }}
          >
            <IonIcon icon={arrowBackOutline} />
          </IonFabButton>
        </IonFab>
      </IonModal>
    </>
  );
};

export default FloatingButtonsMenu;
