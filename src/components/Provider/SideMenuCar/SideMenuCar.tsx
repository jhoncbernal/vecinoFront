import React, { FC } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonFooter,
  IonButton,
  IonText,
  IonAvatar
} from "@ionic/react";
import style from "./style.module.css";

const SideMenuCar: FC<{ [id: string]: any }> = ({ datSide }) => {
  const states: { [id: string]: any } = {
    start: "gray",
    prepare: "purple",
    delivery: "blue-hole",
    finished: "green-light",
    cancel: "red-light"
  };
  const renderList = (products: any) => {
    if (products) {
      return products.map((product: any, index: number) => {
        return (
          <IonItem key={index}>
            <IonAvatar slot="end">
              <img src={product.urlImage} alt="" />
            </IonAvatar>
            <IonText>
              <h4>{product.productName}</h4>
              <p>
                Cantidad{" "}
                <strong>
                  {product.quantity} {product.measureType}
                </strong>
              </p>
            </IonText>
          </IonItem>
        );
      });
    }
  };
  return (
    <>
      <IonMenu contentId="contenido" side="end" swipeGesture={false}>
        <IonHeader>
          <IonToolbar color={states[datSide.state]}>
            <IonTitle>Pedido No: {datSide.code}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="contenido">
          <IonList>{renderList(datSide.products)}</IonList>
        </IonContent>
        <IonFooter>
          <IonHeader>
            <IonTitle>
              <IonLabel>Total:</IonLabel>
              <IonText className={style["price-label"]}>
                ${datSide.Total}
              </IonText>
            </IonTitle>
          </IonHeader>
          <IonButton expand="full">Avanzar</IonButton>
        </IonFooter>
      </IonMenu>
    </>
  );
};

export default SideMenuCar;
