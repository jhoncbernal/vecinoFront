import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  IonCard,
  IonProgressBar,
  IonAlert,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon
} from "@ionic/react";
import { HttpRequest } from "../hooks/HttpRequest";
import ListContainer from "./Product/ListContainer";
import { Storages } from "../hooks/Storage";
import { barChartSharp, pricetagsSharp, pricetag } from "ionicons/icons";

import ChartsContainer from "./Dashboard/ChartsContainer";
import config from "../config";
import PendingShoppingContainer from "./Provider/PendingShoppingContainer";

interface ContainerProps {
  [id: string]: any;
}

const HomeProviderContainer: React.FC<ContainerProps> = ({
  history,
  currentUser,
  handlerDataSide
}) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const user: any = useRef<any>(currentUser);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState("");
  const [productsArray, setProductsArray] = useState<any>([{}]);
  const [segmentValue, setSegmentValue] = useState<any>("product");

  const httpRequest = useCallback(async () => {
    try {
      let pathUrl;
      if (segmentValue === "product") {
        pathUrl = `/${config.ProductContext}?pageSize=100&providerId=${user.current._id}`;
      } else {
        pathUrl = `/${config.ParkingSpaceContext}/${segmentValue}`;
      }
      if (segmentValue === "pendingShop") {
        return;
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
          }
          if (Array.isArray(resultado)) {
            setProductsArray(resultado);
          }
          setHiddenBar(true);

          setLoadData(true);
        })
        .catch(error => {
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

  const handlerDataSideContainer = (data: any) => {
    handlerDataSide(data);
  };

  return (
    <>
      <IonCard class="card-center">
        <IonToolbar>
          <IonSegment
            onIonChange={e => {
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
            <IonSegmentButton value="product">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={pricetagsSharp}
              />
            </IonSegmentButton>
            <IonSegmentButton value="pendingShop">
              <IonIcon class="icons-segment" size="medium" icon={pricetag} />
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        {segmentValue ? (
          <>
            {segmentValue === "product" && hiddenBar ? (
              <ListContainer
                loadData={loadData}
                inputs={productsArray}
                currentUser={currentUser}
                provider={currentUser}
                refreshData={(reset: boolean) => {
                  if (reset) {
                    httpRequest();
                  }
                }}
              ></ListContainer>
            ) : segmentValue === "dashboard" ? (
              <ChartsContainer></ChartsContainer>
            ) : (
              <PendingShoppingContainer
                dataTrigger={handlerDataSideContainer}
              ></PendingShoppingContainer>
            )}
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

export default HomeProviderContainer;
