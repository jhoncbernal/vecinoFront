import React, { useState, useCallback, useEffect } from "react";
import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonListHeader,
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
  IonFooter,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { ShoppingOrder, ShoppingProduct } from "../../../entities";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import handleProducts from "./handleProducts";
import {
  removeSharp,
  addSharp,
  cartOutline,
  informationOutline,
  arrowBack,
  trashBinOutline,
} from "ionicons/icons";
import { pushCartFirebase } from "../../../config/firebase";
import ResumeContainer from "../Order/ResumeContainer";
import * as H from 'history';
interface ContainerProps {
  [id: string]: any;
  history:H.History;
}

const ListContainer: React.FC<ContainerProps> = ({
  history,
  accionTrigger,
  provider,
  oldShoppingCart,
  currentUser,
  changeShoppingCart,
}) => {
  const [shoppingProducts, setShoppingProducts] = useState<ShoppingOrder>();
  const [shoppingCart, setShoppingCart] = useState<any>(oldShoppingCart);
  const [segmentValue, setSegmentValue] = useState<any>("shoppingCart");
  const getProducts = useCallback(async (shoppingCart) => {
    let pathUrl = `${
      config.ProductContext
    }/productsPrice/1?productsIds=${JSON.stringify(shoppingCart)}`;
    await HttpRequest(pathUrl, "GET", "", true)
      .then(async (response: ShoppingOrder) => {
        setShoppingProducts(response);
      })
      .catch((error) => {
        console.error(error);
        history.go(0);
      });
  }, [history]);
  useEffect(() => {
    async function fetchData() {
      await pushCartFirebase(currentUser._id, provider._id, shoppingCart);
    }
    changeShoppingCart(shoppingCart);
    fetchData();

    getProducts(shoppingCart);
  }, [
    changeShoppingCart,
    currentUser,
    getProducts,
    provider._id,
    shoppingCart,
  ]);

  return (
    <>
      <IonToolbar>
        <IonSegment
          onIonChange={(e) => {
            if (e.detail.value === "close") {
              accionTrigger(false);
            } else {
              setSegmentValue(e.detail.value);
            }
          }}
          value={segmentValue}
        >
          <IonSegmentButton value="close">
            <IonIcon icon={arrowBack} />
          </IonSegmentButton>
          <IonSegmentButton value="shoppingCart">
            <IonIcon icon={cartOutline} />
          </IonSegmentButton>
          <IonSegmentButton value="finishOrder"  disabled={shoppingProducts?shoppingProducts.total>0?false:true:true}>
            <IonIcon icon={informationOutline} />
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
      {segmentValue ? (
        <IonContent>
          {segmentValue === "shoppingCart" ? (
            <div>
              <IonToolbar color="primary">
                <IonTitle>Carro de Compras</IonTitle>
              </IonToolbar>
              <IonList class="cartItem">
                <IonListHeader>
                  <IonTitle color="primary">
                    {" "}
                    {provider ? provider.firstName.toUpperCase() : null}
                  </IonTitle>
                </IonListHeader>
                {shoppingProducts
                  ? shoppingProducts.products.map(
                      (shoppingProduct: ShoppingProduct) => {
                        let oldprice =
                          (shoppingProduct.price +
                            shoppingProduct.salving /
                              shoppingProduct.quantity) *
                          shoppingProduct.quantity;
                        let price =
                          shoppingProduct.price * shoppingProduct.quantity;
                        let percent = Math.round((1 - price / oldprice) * 100);
                        return (
                          
                          <IonItem key={shoppingProduct._id}>
                            
                            <IonThumbnail class="ion-align-self-start">
                              <IonImg src={shoppingProduct.urlImage}></IonImg>
                            </IonThumbnail>
                            {shoppingProduct.quantity===0 ||
                                  shoppingCart[shoppingProduct._id]===0?
                                  <>
                            <IonLabel class="ion-padding-self-start ion-margin-vertical">Producto Agotado</IonLabel>
                            <IonButton
                                color={"white"}
                                class="cartBtn"
                                size="small"
                                fill="outline"
                                onClick={() => {
                                  let products = handleProducts(
                                    shoppingProduct._id!,
                                    "Less",
                                    shoppingCart
                                  );
                                  setShoppingCart((prevState: any) => ({
                                    ...prevState,
                                    ...products,
                                  }));
                                }}
                              >
                                <IonIcon
                                  size={"large"}
                                  color={"primary"}
                                  slot="icon-only"
                                  icon={trashBinOutline}
                                />
                              </IonButton>
                            </>
                            :
                            <>
                            <IonLabel class="ion-align-self-center">
                              <IonText color={"dark"}>
                                <p>{shoppingProduct.productName}</p>
                              </IonText>
                              <IonText color="primary">
                                <p>
                                  <strong>
                                    ${price.toLocaleString()}
                                    {shoppingProduct.salving > 0 ? (
                                      <IonText color="dark">
                                        &nbsp;
                                        <s>{`$${oldprice.toLocaleString()}`}</s>
                                      </IonText>
                                    ) : null}
                                  </strong>
                                </p>
                              </IonText>
                              {shoppingProduct.salving > 0 ? (
                                <IonLabel class="ion-align-self-center">
                                  <IonButton
                                    disabled={true}
                                    shape={"round"}
                                    color={"primary"}
                                  >
                                    -{percent}%
                                  </IonButton>
                                </IonLabel>
                              ) : null}
                              {shoppingCart[shoppingProduct._id]===shoppingProduct.totalAmount?<IonLabel class="ion-align-self-start">
                                <p>Max (Und) permitidas</p>
                              </IonLabel>:null}
                            </IonLabel>
                            <IonLabel class="ion-align-self-end ion-margin-vertical">
                              <IonButton
                                color={"white"}
                                class="cartBtn"
                                size="small"
                                fill="outline"
                                onClick={() => {
                                  let products = handleProducts(
                                    shoppingProduct._id!,
                                    "Less",
                                    shoppingCart
                                  );
                                  setShoppingCart((prevState: any) => ({
                                    ...prevState,
                                    ...products,
                                  }));
                                }}
                              >
                                <IonIcon
                                  size={"large"}
                                  color={"primary"}
                                  slot="icon-only"
                                  icon={removeSharp}
                                />
                              </IonButton>
                              <IonButton color={"white"} fill="outline">
                                <IonText color={"primary"}>
                                  {shoppingProduct.quantity !==
                                  shoppingCart[shoppingProduct._id]
                                    ? shoppingCart[shoppingProduct._id]
                                    : shoppingProduct.quantity}
                                </IonText>
                              </IonButton>
                              <IonButton
                                color={"white"}
                                class="cartBtn"
                                size="small"
                                fill="outline"
                                onClick={() => {
                                  if(shoppingCart[shoppingProduct._id]<shoppingProduct.totalAmount){
                                    let products = handleProducts(
                                    shoppingProduct._id!,
                                    "Add",
                                    shoppingCart
                                  );
                                  setShoppingCart((prevState: any) => ({
                                    ...prevState,
                                    ...products,
                                  }));}
                                }}
                              >
                                <IonIcon
                                  size={"large"}
                                  color={"primary"}
                                  slot="icon-only"
                                  icon={addSharp}
                                />
                              </IonButton>
                            </IonLabel>
                            </>}
                          </IonItem>
                        );
                      }
                    )
                  : null}
              </IonList>
           
            </div>
          ) : segmentValue === "finishOrder" ? (
            <ResumeContainer
            history={history}
              currentUser={currentUser}
              provider={provider}
              order={shoppingProducts}
              products={shoppingCart}
              closeModal={(response: boolean) => {
                accionTrigger(response);
              }}
              clearCart={() => {
                setShoppingCart(
                 {}
                );
              }}
            ></ResumeContainer>
          ) : null}   
          {segmentValue === "shoppingCart" ?<IonFooter>
          <IonToolbar>
            <IonTitle>
              SubTotal: $
              {shoppingProducts
                ? shoppingProducts.total.toLocaleString()
                : null}
            </IonTitle>
            <IonButton
            disabled={shoppingProducts?shoppingProducts.total>0?false:true:true}
              onClick={() => {
                setSegmentValue("finishOrder");
              }}
              expand="full"
            >
              Finalizar orden
            </IonButton>
          </IonToolbar>
        </IonFooter>:null}
        </IonContent>
      ) : null}
    </>
  );
};

export default ListContainer;
