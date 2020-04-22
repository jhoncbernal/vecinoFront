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
  IonCardHeader,
  useIonViewWillEnter
} from "@ionic/react";
import style from "./style.module.css";
import { menuController } from "@ionic/core";
import config from "../../../config";
import { HttpRequest } from "../../../hooks/HttpRequest";
import { refProviderFirebase } from "../../../config/firebase";
import { Bill } from "../../../entities";

const PendingShoppingContainer: FC<componentData> = ({
  dataTrigger,
  hideLoadBar,
  currentUser
}) => {
  const states: { [id: string]: any } = {
    start: { color: "gray", next: "prepare" },
    prepare: { color: "purple", next: "delivery" },
    delivery: { color: "blue-hole", next: "finished" },
    finished: { color: "green-light", next: "" },
    cancel: "red-light"
  };
  const [bills, setBills] = useState<any[]>();

  const getData = () => {
    const pathUrl = `${config.BillsContext}/provider/1`;
    HttpRequest(pathUrl, "GET", "", true)
      .then(response => {
        setBills(response);
        hideLoadBar(true);
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    refProviderFirebase(currentUser._id).on("value", snapshot => {
      setBills([]);
      const pendingData: any[] = [];
      snapshot.forEach(snap => {
        pendingData.push(snap.val());
        hideLoadBar(true);
      });
      setBills(pendingData);
    });
  }, []);

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
            <IonCardHeader color={getColorState(bill)}>
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
                  <IonText>{bill.products ? bill.products.length : 0}</IonText>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        );
      });
    }
  };
  const getColorState = (bill: Bill) => {
    let color = "gray";
    if (bill.state == "start") {
      return color;
    } else {
      if (bill.state) {
        color = states[bill.state[bill.state.length - 1].state].color;
        return color;
      }
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
