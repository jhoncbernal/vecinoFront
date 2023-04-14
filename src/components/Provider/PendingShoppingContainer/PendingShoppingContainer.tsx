import React, { FC } from "react";
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
  IonButton,
} from "@ionic/react";
import style from "./style.module.css";
import { menuController } from "@ionic/core";
import { Bill } from "../../../entities";
import { StatesDictionary } from "../../../hooks/OrderStates";

const PendingShoppingContainer: FC<ComponentData> = ({
  dataTrigger,
  bills,
}) => {
  const statesStyle = StatesDictionary().states;
  const getStateStyle = (bill: Bill) => {
    if (bill.states && statesStyle) {
      const pos: number = bill.states.length - 1;
      return statesStyle.get(bill.states[pos].state);
    }
  };
  const handlerSide = (request: any) => {
    dataTrigger(request);
  };
  const renderCardsData = () => {
    if (bills) {
      return bills.map((bill: Bill, index) => {
        const state = getStateStyle(bill);
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
                        : bill.user.neighborhood.address === "NO APLICA"
                        ? bill.user.address
                        : bill.user.neighborhood.address}
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
                        <IonText>{bill.user?.propertyInfo?.sectionNumber}</IonText>
                      </IonItem>
                    </IonCol>
                    <IonCol size-xs="6" size-md="3" size-lg="1">
                      <IonItem lines="none">
                        <IonLabel position="stacked">
                          <p>Apt:</p>
                        </IonLabel>
                        <IonText>{bill.user?.propertyInfo.propertyNumber}</IonText>
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
                    <IonButton
                      color={"dark"}
                      type="button"
                      fill="clear"
                      data-toggle="collapse"
                      href={`https://api.whatsapp.com/send?phone=57${bill.user.phone}`}
                      data-target="#landx-navigation"
                      routerDirection="none"
                      target="_blank"
                    >
                      {bill.user.phone}
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-end">
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
                  size-xs="6"
                  size-md="3"
                  size-lg="2"
                >
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
                {bill.MethodOfPayment === "Cash" ? (
                  <>
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
                        <IonText>
                          ${bill.change ? bill.change.toLocaleString() : 0}
                        </IonText>
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
                          <p>Cash</p>
                        </IonLabel>
                        <IonText>
                          $
                          {bill.cashValue ? bill.cashValue.toLocaleString() : 0}
                        </IonText>
                      </IonItem>
                    </IonCol>
                  </>
                ) : (
                  <IonCol
                    size-xs="6"
                    size-md="3"
                    size-lg="2"
                    hidden={bill.cashValue <= 0}
                  >
                    <IonItem lines="none">
                      <IonLabel position="stacked">
                        <p>Metodo de pago</p>
                      </IonLabel>
                      <IonText>{bill.MethodOfPayment}</IonText>
                    </IonItem>
                  </IonCol>
                )}
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
interface ComponentData {
  [id: string]: any;
  bills: Array<Bill>;
}

export default PendingShoppingContainer;
