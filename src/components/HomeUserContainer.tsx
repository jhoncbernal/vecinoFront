import React, { useCallback, useState, useEffect } from "react";
import {
  IonCard,
  IonProgressBar,
  IonAlert,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { HttpRequest } from "../hooks/HttpRequest";
import ListContainer from "./Provider/ListContainer";
import { Storages } from "../hooks/Storage";

import config from "../config";
import * as H from "history";
import ListContainerPendings from "../components/Product/Order/ListContainer";
import { User } from "../entities";
import { timeOutline } from "ionicons/icons";
import { refByIdFirebase } from "../config/firebase";
import { createLocalNotification } from "../hooks/LocalNotification";
interface ContainerProps {
  history: H.History;
  currentUser: User;
  handlerDataSide: any;
}

const HomeUserContainer: React.FC<ContainerProps> = ({
  history,
  currentUser,
}) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [fireData, setFireData] = useState<any>();
  const [message, setMessage] = useState("");
  const [productsArray, setProductsArray] = useState<any>();
  const [segmentValue, setSegmentValue] = useState<any>("provider");
  const [pending, setPending] = useState(0);
  const httpRequest = useCallback(async () => {
    try {
      let pathUrl;
      if (segmentValue === "provider") {
        pathUrl = `${config.ProviderContext}/names/${currentUser.city}`;

        await HttpRequest(pathUrl, "GET", "", true)
          .then(async (resultado: any) => {
            if (Array.isArray(resultado)) {
              setProductsArray(resultado);
            }
            setHiddenBar(true);

            setLoadData(true);
          })
          .catch((error) => {
            if (error.message.includes("Error de conexion")) {
              setTimeout(() => {
                history.go(0);
              }, 7000);
            } else {
              if (error.message.includes("404")) {
                setHiddenBar(true);
                setLoadData(true);
              } else {
                throw error;
              }
            }
          });
      }
    } catch (e) {
      const { removeItem } = await Storages();
      await removeItem("token");
      await removeItem("user");
      setMessage(e.message);
      setShowAlert1(true);
      console.error("HomeAdminPageContainer: " + e);
      setHiddenBar(true);
      history.push("/login");
    }
  }, [currentUser.city, history, segmentValue]);

  useEffect(() => {
    setHiddenBar(false);
    setLoadData(false);
    httpRequest();
  }, [httpRequest, segmentValue]);
  useEffect(() => {
    setPending(0);
    refByIdFirebase("users", currentUser._id ? currentUser._id : "").on(
      "value",
      (snapshot: any) => {
        const pendingData: any[] = [];
        snapshot.forEach((snap: any) => {
          pendingData.push({ code: snap.key, states: snap.val() });
          
        });
        if (pendingData && pendingData.length > 0) {
         
          console.log(pendingData);
          const states: any = {
            start: "Esta siendo procesado",
            prepare: "Se esta alistado",
            delivery: "Se encuentra en camino",
            finished: "Disfruta tu pedido!",
            cancel: "Lo lamentamos pero tu pedido fue cancelado!",
          };
          const last = pendingData[pendingData.length - 1];
          const state: string = last.states[last.states.length - 1].state;
          if (state) {
            if (!state.includes("!")) {
              setPending(pendingData.length);
            }
            createLocalNotification("Su pedido " + last.code, states[state]);
          }
        }
        setFireData(pendingData);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <>
      <IonCard class="home-card-center">
        <IonToolbar>
          <IonSegment
            onIonChange={(e) => {
              setSegmentValue(e.detail.value);
              if(e.detail.value==="pendingShop"){
                setPending(0);
              }
            }}
            value={segmentValue}
          >
            <IonSegmentButton value="provider">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={"assets/icons/MarketPlace.svg"}
              />
            </IonSegmentButton>
            <IonSegmentButton value="pendingShop">
              <IonBadge hidden={pending <= 0}>{pending}</IonBadge>
              <IonIcon class="icons-segment" size="medium" icon={timeOutline} />
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        {segmentValue ? (
          <>
            {segmentValue === "provider" ? (
              <ListContainer
                history={history}
                loaddata={loadData}
                inputs={productsArray}
                currentUser={currentUser}
              >
                <IonProgressBar
                  hidden={hiddenBar}
                  type="indeterminate"
                ></IonProgressBar>
              </ListContainer>
            ) : segmentValue === "pendingShop" ? (
              <ListContainerPendings
                fireData={fireData}
                history={history}
              ></ListContainerPendings>
            ) : null}
          </>
        ) : (
          <></>
        )}

        <br />
      </IonCard>

      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(true)}
        header={"Advertencia"}
        subHeader={"se produjo un error debido a que:"}
        message={message}
        buttons={["OK"]}
      />
    </>
  );
};

export default HomeUserContainer;
