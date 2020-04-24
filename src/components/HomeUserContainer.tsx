import React, { useCallback, useState, useEffect } from "react";
import {
  IonCard,
  IonProgressBar,
  IonAlert,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from "@ionic/react";
import { HttpRequest } from "../hooks/HttpRequest";
import ListContainer from "./Provider/ListContainer";
import { Storages } from "../hooks/Storage";
import { barChartSharp, pricetagsSharp } from "ionicons/icons";

import ChartsContainer from "./Dashboard/ChartsContainer";
import config from "../config";
import * as H from 'history';
interface ContainerProps {
  history: H.History;
  currentUser: any;
}

const HomeUserContainer: React.FC<ContainerProps> = ({
  history,
  currentUser,
}) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState("");
  const [productsArray, setProductsArray] = useState<any>([{}]);
  const [segmentValue, setSegmentValue] = useState<any>("provider");

  const httpRequest = useCallback(async () => {
    try {
      let pathUrl;
      if (segmentValue === "provider") {
        pathUrl = `${config.ProviderContext}/names/1`;
      } else {
        pathUrl = ""; //`/parkingspace/${segmentValue}`;
      }
      await HttpRequest(pathUrl, "GET", "", true)
        .then(async (resultado: any) => {
          try {
            if (resultado.status) {
              setMessage("No se encontro ningun");
              setShowAlert1(true);
            }
          } catch (e) {
            console.error(e);
            history.go(0);
          }
          if (Array.isArray(resultado)) {
            setProductsArray(resultado);
          }
          setHiddenBar(true);

          setLoadData(true);
        })
        .catch((error) => {
          if (error.message.includes("404")) {
            setHiddenBar(true);
            setLoadData(true);
          } else {
            throw error;
          }
        });
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
  }, [history, segmentValue]);

  useEffect(() => {
    setHiddenBar(false);
    setLoadData(false);
    setProductsArray([{}]);
    httpRequest();
  }, [httpRequest, segmentValue]);

  return (
    <>
      <IonCard class="card-center">
        <IonToolbar>
          <IonSegment
            onIonChange={(e) => {
              setSegmentValue(e.detail.value);
            }}
            value={segmentValue}
          >
            <IonSegmentButton value="dashboard">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={barChartSharp}
              />
            </IonSegmentButton>
            <IonSegmentButton value="provider">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={pricetagsSharp}
              />
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        {segmentValue ? (
          <>
            {segmentValue === "provider" && hiddenBar ? (
              <ListContainer
              history={history}
                loaddata={loadData}
                inputs={productsArray}
                currentUser={currentUser}
              ></ListContainer>
            ) : segmentValue === "dashboard" ? (
              <ChartsContainer></ChartsContainer>
            ) : null}
          </>
        ) : (
          <></>
        )}
        <IonProgressBar
          hidden={hiddenBar}
          type="indeterminate"
        ></IonProgressBar>
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
