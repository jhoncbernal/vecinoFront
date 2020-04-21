import React, { FC, useEffect, useState } from "react";
import {
  IonTitle,
  IonList,
  IonItem,
  IonHeader,
  IonLabel,
  IonText,
  IonCardContent,
  IonCard,
  IonCardHeader
} from "@ionic/react";
import style from "./style.module.css";
import { menuController } from "@ionic/core";
import config from "../../../config";
import { HttpRequest } from "../../../hooks/HttpRequest";

const PendingShoppingContainer: FC<componentData> = ({ dataTrigger }) => {
  const states: { [id: string]: any } = {
    start: "gray",
    prepare: "purple",
    delivery: "blue-hole",
    finished: "green-light",
    cancel: "red-light"
  };
  const [bills, setBills] = useState<any[]>();
  const getData = () => {
    const pathUrl = `${config.BillsContext}/provider/1`;
    HttpRequest(pathUrl, "GET", "", true)
      .then(response => {
        setBills(response);
      })
      .catch(e => {
        console.error(e);
      });
  };
  useEffect(() => {
    if (!bills) {
      getData();
    }
  }, [bills]);

  const handlerSide = (request: any) => {
    dataTrigger(request);
  };
  const renderCardsData = () => {
    if (bills) {
      return bills.map((bill, index) => {
        return (
          <IonCard
            key={index}
            onClick={() => {
              handlerSide(bill);
              menuController.open();
            }}
          >
            <IonCardHeader color={states[bill.state]}>
              <IonText>Pedido No: {bill.code}</IonText>
              <IonText className={style["price-label"]}>{bill.Total}</IonText>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Conjunto</IonLabel>
                  <IonText>{bill.user.neighborhood.firstName}</IonText>
                </IonItem>
                <IonItem>
                  <IonLabel>Horario</IonLabel>
                  <IonText>{bill.DeliverySchedule}</IonText>
                </IonItem>
                <IonItem>
                  <IonLabel>Cantidad de productos</IonLabel>
                  <IonText>{bill.products.length}</IonText>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        );
      });
    }
  };
  return (
    <>
      <IonHeader>
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
