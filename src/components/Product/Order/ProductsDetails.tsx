import React, { useState } from "react";
import {
  IonItem,
  IonText,
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
  IonModal,
} from "@ionic/react";
import * as H from "history";
import { ProductBill, Bill } from "../../../entities";
import ShoppingListContainer from "../shopingCart/ListContainer";
interface ContainerProps {
  history: H.History;
  bill: Bill;
  resumePayment: any;
}

const ProductsDetailsContainer: React.FC<ContainerProps> = ({ history, bill,resumePayment }) => {
 const products: Array<ProductBill>=bill.products;
 const [showModal, setShowModal] = useState<boolean>(false);
 const lastState=bill.states[bill.states.length-1].state;
 let productsCart: any = {};
  return (
    <IonCard>
      <IonToolbar>
        <IonTitle>Detalle Pedido</IonTitle>
      </IonToolbar>
      <IonCardContent>
      <IonList>
        {products
          ? products.map((product: ProductBill, index) => {
           
            productsCart[product._id] = product.quantity;
              const oldprice =
                (product.price + product.salving / product.quantity) *
                product.quantity;
              const price = product.price * product.quantity;
              const percent = Math.round((1 - price / oldprice) * 100);
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
          <IonButton hidden={lastState==="finished"||lastState==="cancel"?false:true} expand='full' onClick={()=>{setShowModal(true);}}>Volver a comprar</IonButton>
      </IonList>

      </IonCardContent>
      <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}
            animated={true}
            id={"modal"}
          >
            <ShoppingListContainer
              history={history}
              provider={bill.provider}
              oldShoppingCart={productsCart}
              currentUser={bill.user}
              changeShoppingCart={(response: any) => {
                productsCart=response;
              }}
              accionTrigger={(response: boolean) => {
                setShowModal(response);
              }}
            ></ShoppingListContainer>
          </IonModal>
    </IonCard>
  );
};

export default ProductsDetailsContainer;
