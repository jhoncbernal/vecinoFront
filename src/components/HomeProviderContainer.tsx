import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  IonCard,
  IonProgressBar,
  IonAlert,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonBadge,
  IonLoading,
  IonTitle,
  IonImg,
  IonCardHeader,
  IonText,
} from "@ionic/react";
import { HttpRequest } from "../hooks/HttpRequest";
import ListContainer from "./Product/ListContainer";
import { Storages } from "../hooks/Storage";
import { timeOutline, pricetagsOutline } from "ionicons/icons";
import config from "../config";
import PendingShoppingContainer from "./Provider/PendingShoppingContainer";
import { refByIdFirebase } from "../config/firebase";
import { Bill } from "../entities";
import { createLocalNotification } from "../hooks/LocalNotification";

interface ContainerProps {
  [id: string]: any;
}

const HomeProviderContainer: React.FC<ContainerProps> = ({
  history,
  currentUser,
  handlerDataSide,
}) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const user: any = useRef<any>(currentUser);
  const [pending, setPending] = useState(0);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState("");
  const [productsArray, setProductsArray] = useState<any>();
  const [segmentValue, setSegmentValue] = useState<any>("product");
  const [bills, setBills] = useState<Array<Bill>>();
  useEffect(() => {
    refByIdFirebase("providers", currentUser._id).on("value", (snapshot) => {
      setPending(0);
      const pendingData: any[] = [];
      snapshot.forEach((snap) => {
        pendingData.push(snap.val());
        setHiddenBar(true);
      });
      if (pendingData.length > 0) {
        setPending(pendingData.length);
        createLocalNotification(
          "Nuevo pedido" + pendingData[pendingData.length - 1].code,
          "Se encuentra pendiente"
        );

        setBills(pendingData);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);
  const httpRequest = useCallback(async () => {
    try {
      let pathUrl;
      if (segmentValue === "product") {
        pathUrl = `/${config.ProductContext}?pageSize=100&providerId=${user.current._id}`;
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
              }, 10000);
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
      setHiddenBar(true);
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
    httpRequest();
  }, [httpRequest, segmentValue]);

  const handlerDataSideContainer = (data: any) => {
    handlerDataSide(data);
  };

  return (
    <>
      <IonCard class="home-card-center">
        <IonToolbar>
          <IonSegment
            onIonChange={(e) => {
              setSegmentValue(e.detail.value);
            }}
            value={segmentValue}
          >
            <IonSegmentButton value="product">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={pricetagsOutline}
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
            {segmentValue === "product" && hiddenBar ? (
              loadData ? (
                <ListContainer
                  history={history}
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
              ) : (
                <IonLoading
                  isOpen={!loadData}
                  spinner="bubbles"
                  onDidDismiss={() => setLoadData(true)}
                  message={"Por favor espere"}
                  duration={5000}
                />
              )
            ) : segmentValue === "pendingShop" && bills ? (
              <PendingShoppingContainer
                dataTrigger={handlerDataSideContainer}
                bills={bills}
              ></PendingShoppingContainer>
            ) : (
              <IonCard>
                <IonCardHeader>
                  <IonTitle class="ion-text-center ion-margin-top">
                  <strong>!Bien hecho!</strong>
                  </IonTitle>
                    <IonText>
                   
                      <p> Completaste todos 
                        tus pedidos pendientes.</p>
                    </IonText>
                 
                </IonCardHeader>
                <IonImg class="justImage " src={"/assets/img/Finish.png"} />
              </IonCard>
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
