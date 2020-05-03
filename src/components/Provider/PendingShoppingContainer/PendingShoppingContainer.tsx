import React, { FC, useEffect, useState } from "react";
import {
  IonTitle,
  IonItem,
  IonHeader,
  IonLabel,
  IonText,
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import style from "./style.module.css";
import { menuController } from "@ionic/core";
import { refProviderBillsFirebase } from "../../../config/firebase";
import { Bill } from "../../../entities";
import { StatesDictionary } from "../../../hooks/OrderStates";

const PendingShoppingContainer: FC<componentData> = ({
  dataTrigger,
  hideLoadBar,
  currentUser,
}) => {
  const [bills, setBills] = useState<Array<Bill>>();
  const statesStyle = StatesDictionary().states;

  useEffect(() => {
    refProviderBillsFirebase(currentUser._id).on("value", (snapshot) => {
      setBills([]);
      const pendingData: any[] = [];
      snapshot.forEach((snap) => {
        pendingData.push(snap.val());
        hideLoadBar(true);
      });
      setBills(pendingData);
    });
  }, [currentUser._id, hideLoadBar]);

  const handlerSide = (request: any) => {
    dataTrigger(request);
  };
  const renderCardsData = () => {
    if (bills) {
      return bills.map((bill: Bill, index) => {
        let state = getStateStyle(bill);
        return (
          <IonCard
            key={index}
            onClick={() => {
              handlerSide(bill);
              menuController.open();
            }}
          >
            <IonCardHeader color={state ? state.color : "white"}>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <IonIcon
                      size="large"
                      icon={state ? state.icon : "white"}
                    ></IonIcon>
                    <IonText class="ion-margin-vertical">
                      {state ? state.state : null}
                      {bill.DeliverySchedule ? (
                        bill.DeliverySchedule.includes("Ahora") ? (
                          <IonBadge color="danger">!!!</IonBadge>
                        ) : null
                      ) : null}
                    </IonText>
                  </IonCol>
                  <IonCol class="ion-padding-vertical" size="4">
                    <IonText>Pedido No: {bill.code}</IonText>
                  </IonCol>

                  <IonCol size="4">
                    <IonText className={style["price-label"]}>
                      ${bill.Total.toLocaleString()}
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size-xs="12" size-md="4" size-lg="4">
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>Direccion</p>
                    </IonLabel>
                    <IonText>
                      {bill.otherAddress
                        ? bill.otherAddress
                        : bill.user.neighborhood.address==='NO APLICA'?bill.user.address:bill.user.neighborhood.address}
                    </IonText>
                  </IonItem>
                </IonCol>
                {!bill.otherAddress ? (
                  <>
                    <IonCol size-xs="12" size-md="4" size-lg="2">
                      <IonItem lines="none">
                        <IonLabel position="stacked">
                          <p>Conjunto</p>
                        </IonLabel>
                        <IonText>{bill.user.neighborhood.firstName}</IonText>
                      </IonItem>
                    </IonCol>
                    <IonCol size-xs="6" size-md="3" size-lg="1">
                      <IonItem lines="none">
                        <IonLabel position="stacked">
                          <p>Torre:</p>
                        </IonLabel>
                        <IonText>{bill.user.blockNumber}</IonText>
                      </IonItem>
                    </IonCol>
                    <IonCol size-xs="6" size-md="3" size-lg="1">
                      <IonItem lines="none">
                        <IonLabel position="stacked">
                          <p>Apt:</p>
                        </IonLabel>
                        <IonText>{bill.user.homeNumber}</IonText>
                      </IonItem>
                    </IonCol>
                  </>
                ) : null}
                <IonCol size-xs="6" size-md="3" size-lg="2">
                      <IonItem lines="none">
                        <IonLabel position="stacked">
                          <p>Nombre:</p>
                        </IonLabel>
                        <IonText>{bill.user.firstName}</IonText>
                      </IonItem>
                    </IonCol>
                    <IonCol size-xs="6" size-md="3" size-lg="2">
                      <IonItem lines="none">
                        <IonLabel position="stacked">
                          <p>Telefono:</p>
                        </IonLabel>
                        <IonText><small>{bill.user.phone}</small></IonText>
                      </IonItem>
                    </IonCol>
              </IonRow>
              <IonRow
                class="ion-justify-content-end"
              >
                <IonCol
                  size-xs="6"
                  size-md="3"
                  size-lg="2"
                  hidden={bill.tip <= 0}
                >
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>Propina</p>
                    </IonLabel>
                    <IonText>${bill.tip.toLocaleString()}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol
                hidden={bill.deliveryExtraCharge + bill.deliveryCharge <= 0}
                 size-xs="6" size-md="3" size-lg="2">
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>Envio</p>
                    </IonLabel>
                    <IonText>
                      $
                      {bill.deliveryExtraCharge
                        ? (
                            bill.deliveryExtraCharge + bill.deliveryCharge
                          ).toLocaleString()
                        : bill.deliveryCharge.toLocaleString()}
                    </IonText>
                  </IonItem>
                </IonCol>
                <IonCol
                  size-xs="6"
                  size-md="3"
                  size-lg="2"
                  hidden={bill.change <= 0}
                >
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>Cambio</p>
                    </IonLabel>
                    <IonText>${bill.change.toLocaleString()}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol
                  size-xs="6"
                  size-md="3"
                  size-lg="2"
                  hidden={bill.cashValue <= 0}
                >
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>Efectivo</p>
                    </IonLabel>
                    <IonText>${bill.cashValue.toLocaleString()}</IonText>
                  </IonItem>
                </IonCol>
                <IonCol size-xs="6" size-md="3" size-lg="2">
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>#Productos</p>
                    </IonLabel>
                    <IonText>
                      {bill.products ? bill.products.length : 0}
                    </IonText>
                  </IonItem>
                </IonCol>
                <IonCol size-xs="12" size-md="3" size-lg="2">
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      <p>Horario</p>
                    </IonLabel>
                    <IonText>{bill.DeliverySchedule}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        );
      });
    }
  };
  const getStateStyle = (bill: Bill) => {
    if (bill.states && statesStyle) {
      let pos: number = bill.states.length - 1;
      return statesStyle.get(bill.states[pos].state);
    }
  };
  return (
    <>
      <IonHeader id="auxContent">
        <IonTitle className={style["title-header"]}>
          Pedidos pendientes
        </IonTitle>
      </IonHeader>
      {renderCardsData()}
    </>
  );
};
interface componentData {
  [id: string]: any;
}

export default PendingShoppingContainer;
