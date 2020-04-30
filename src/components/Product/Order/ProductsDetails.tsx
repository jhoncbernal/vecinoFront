import React from "react";
import {
  IonItem,
  IonText,
  useIonViewDidLeave,
  IonToolbar,
  IonTitle,
  IonList,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonButton,
  IonCard,
  IonCardContent, 
  IonItemGroup,
} from "@ionic/react";
import * as H from "history";
import { ProductBill, Bill } from "../../../entities";

interface ContainerProps {
  history: H.History;
  bill: Bill;
  resumePayment:any
}

const ProductsDetailsContainer: React.FC<ContainerProps> = ({ history, bill,resumePayment }) => {
 let products: Array<ProductBill>=bill.products
 
  useIonViewDidLeave(() => {
    console.log("ionViewDidLeave event fired");
  });

  return (
    <IonCard>
      <IonToolbar>
        <IonTitle>Detalle Pedido</IonTitle>
      </IonToolbar>
      <IonCardContent>
      <IonList>
        {products
          ? products.map((product: ProductBill, index) => {
              let oldprice =
                (product.price + product.salving / product.quantity) *
                product.quantity;
              let price = product.price * product.quantity;
              let percent = Math.round((1 - price / oldprice) * 100);
              return (
                <IonItem key={index}>
                  <IonThumbnail class="ion-align-self-start ion-margin">
                    <IonImg src={product.urlImage}></IonImg>
                  </IonThumbnail>
                  <>
                    <IonLabel class="ion-align-self-center">
                      <IonText color={"steel"}>
                        <p>{product.productName}</p>
                      </IonText>
                      <IonText color="dark">
                        <p>
                          <strong>
                            ${product.price.toLocaleString()}
                            {product.salving > 0 ? (
                              <IonText color="steel">
                                &nbsp;
                                <s>{`$${oldprice.toLocaleString()}`}</s>
                              </IonText>
                            ) : null}
                          </strong>
                        </p>
                      </IonText>
                      {product.salving > 0 ? (
                        <IonLabel class="ion-align-self-center">
                          <IonButton
                            disabled={true}
                            shape={"round"}
                            color={"secondary"}
                          >
                            -{percent}%
                          </IonButton>
                        </IonLabel>
                      ) : null}
                    </IonLabel>
                    <IonLabel class="ion-align-self-end ion-margin-vertical ion-text-end">
                      <IonButton color={"white"} fill="outline">
                        <IonText color={"primary"}><h2>x{product.quantity}</h2></IonText>
                      </IonButton>
                    </IonLabel>
                  </>
                </IonItem>
              );
            })
          : null}
          <IonItemGroup> {resumePayment}</IonItemGroup>
      </IonList>
       
      </IonCardContent>
    </IonCard>
  );
};

export default ProductsDetailsContainer;
