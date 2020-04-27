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
} from "@ionic/react";
import style from "./style.module.css";
import { menuController } from "@ionic/core";
import config from "../../../config";
import { HttpRequest } from "../../../hooks/HttpRequest";
import { refProviderBillsFirebase } from "../../../config/firebase";
import { Bill } from "../../../entities";

const PendingShoppingContainer: FC<componentData> = ({
  dataTrigger,
  hideLoadBar,
  currentUser
}) => {
  const states: Array<any> = [
    { color: "gray", next: "prepare" },
    { color: "purple", next: "delivery" },
     { color: "blue-hole", next: "finished" },
     { color: "green-light", next: "" },
     { color: "red-light", next: "" }
];
  const [bills, setBills] = useState<any[]>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    refProviderBillsFirebase(currentUser._id).on("value", snapshot => {
      setBills([]);
      const pendingData: any[] = [];
      snapshot.forEach(snap => {
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
    if(bill.states){
    if (bill.states.length === 1) {
      return color;
    } else {
        color = states[bill.states.length-1].color;
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
