/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import {
  useIonViewDidLeave,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonImg,
  IonThumbnail,
  IonItemDivider,
  IonText,
  IonBadge,
  IonModal,
  IonContent,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import * as H from "history";
import { Bill } from "../../../entities";
import { Plugins } from "@capacitor/core";
import "./Order.css";
import {
  mapSharp,
  walletSharp,
  basketSharp,
  informationCircleSharp,
  cashSharp,
  arrowBackOutline,
} from "ionicons/icons";
import { StatesDictionary } from "../../../hooks/OrderStates";
import ProductsDetailsContainer from "./ProductsDetails";
interface ContainerProps {
  bill: Bill | undefined;
  history: H.History;
}

const DetailsOrder: React.FC<ContainerProps> = ({ bill, history }) => {
  useIonViewDidLeave(() => {
    console.log("ionViewDidLeave event fired");
  });

  const [showModal, setShowModal] = useState(false);
  const [chunkSize, setChunkSize] = useState();
  const { Device } = Plugins;
  useEffect(() => {
    async function fetchData() {
      const device = await Device.getInfo();
      console.log(device);
      let size =
        device.operatingSystem === "android" || device.operatingSystem === "ios"
          ? 3
          : 6;
      let productsSize = bill ? bill.products.length : 0;
      if (productsSize > 0) {
        setChunkSize(size > productsSize ? productsSize : size);
      }
    }
    fetchData();
  }, [Device, bill]);

  const statesStyle = StatesDictionary().states;
  const resumePayment = (bill: Bill) => {
        return (<>
          <IonItem>
            <IonLabel> Resumen de pago</IonLabel>
            <IonIcon
              class="ion-margin"
              color={"primary"}
              icon={cashSharp}
            ></IonIcon>
          </IonItem>
          <IonCardContent>
            <IonItem>
              <IonLabel class="ion-text-start">SubTotal</IonLabel>
              <IonLabel class="ion-text-end">
                ${bill.subTotal.toLocaleString()}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel class="ion-text-start">Envio</IonLabel>
              <IonLabel class="ion-text-end">
                {bill.deliveryCharge + bill.deliveryExtraCharge > 1 ? (
                  `$${(
                    bill.deliveryCharge + bill.deliveryExtraCharge
                  ).toLocaleString()}`
                ) : (
                  <IonText color={"primary"}>
                    <strong>GRATIS</strong>
                  </IonText>
                )}
              </IonLabel>
            </IonItem>
            <IonItem hidden={bill.tip < 1}>
              <IonLabel class="ion-text-start">Propina</IonLabel>
              <IonLabel class="ion-text-end">
                ${bill.tip.toLocaleString()}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel class="ion-text-start">Total</IonLabel>
              <IonLabel class="ion-text-end">
                ${bill.Total.toLocaleString()}
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </>
        );
  };
  return (
    <IonContent>
      {bill ? (
        <>
            <IonToolbar>
              <IonTitle>Estado de tu pedido</IonTitle>
            </IonToolbar>
          <IonCardContent>
            <IonCard>
              <IonItemGroup>
                {bill.states.map((state, index) => {
                  let style = statesStyle.get(state.state);
                  return (
                    <IonItem lines="none" key={index}>
                      <IonIcon
                        color={style?.color}
                        icon={style?.icon}
                        class="ion-margin"
                      ></IonIcon>
                      <IonLabel>
                        {style?.state}
                        <p>
                          <small>{state.start}</small>
                        </p>
                      </IonLabel>
                    </IonItem>
                  );
                })}
              </IonItemGroup>
            </IonCard>
            <IonCard
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IonItem lines="none">
                <IonLabel>Productos</IonLabel>
                <IonIcon
                  slot="start"
                  color={"primary"}
                  icon={basketSharp}
                ></IonIcon>
              </IonItem>
              <IonItemDivider class="ion-margin">
                {bill.products.map((product: any, index) => {
                  if (index < chunkSize) {
                    return (
                      <IonThumbnail key={index}>
                        <IonImg src={product.urlImage} />
                      </IonThumbnail>
                    );
                  }
                })}
                <IonItemGroup class="ion-margin">
                  <IonIcon
                    color={"gray"}
                    class="ion-margin-top ion-margin-horizontal"
                    size="large"
                    slot="start"
                    icon={informationCircleSharp}
                  ></IonIcon>
                  <IonText>
                    <p>
                      Ver todos
                      <IonBadge slot={"start"}>
                        {bill.products.length}
                      </IonBadge>
                    </p>
                  </IonText>
                </IonItemGroup>
              </IonItemDivider>
            </IonCard>
            <IonCard>
              <IonItemDivider>
                <IonItem lines="none">
                  <IonIcon color="primary" icon={walletSharp} slot="start" />
                  <IonLabel position="stacked">Methodo de Pago</IonLabel>
                  <IonText color="dark">{bill.MethodOfPayment}</IonText>
                </IonItem>
              </IonItemDivider>
              <IonItemDivider>
                <IonItem lines="none">
                  <IonIcon color="primary" icon={mapSharp} slot="start" />
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonText color="dark">
                    {bill.otherAddress
                      ? bill.otherAddress
                      : bill.user.neighborhood.address}
                  </IonText>
                </IonItem>
              </IonItemDivider>
            </IonCard>
            <IonCard>
            {resumePayment(bill)}</IonCard>
          </IonCardContent>
        
      <IonModal
        onDidDismiss={(e) => setShowModal(false)}
        isOpen={showModal}
        animated={true}
      >
        <IonContent>
          <ProductsDetailsContainer history={history} bill={bill} resumePayment={resumePayment(bill)}></ProductsDetailsContainer>
          <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton
              onClick={() => setShowModal(false)}
              routerLink="/home"
            >
              <IonIcon icon={arrowBackOutline} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonModal>
      </>
      ) : null}
    </IonContent>
  );
};

export default DetailsOrder;
