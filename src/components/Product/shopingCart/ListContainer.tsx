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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { ShoppingOrder, ShoppingProduct } from "../../../entities";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import handleProducts from "./handleProducts";
import {
  removeSharp,
  addSharp,
  cartOutline,
  arrowBack,
  trashBinOutline,
  trashBinSharp,
} from "ionicons/icons";
import { pushCartFirebase } from "../../../config/firebase";
import ResumeContainer from "../Order/ResumeContainer";
import * as H from "history";
interface ContainerProps {
  [id: string]: any;
  history: H.History;
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
  const getProducts = useCallback(
    async (shoppingCart) => {
      const pathUrl = `${
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
    },
    [history]
  );
  useEffect(() => {
    async function fetchData() {
      await pushCartFirebase(currentUser._id, provider._id, shoppingCart);
    }
    changeShoppingCart(shoppingCart);
    fetchData();

    getProducts(shoppingCart);
    if (Object.keys(shoppingCart).length === 0) {
      changeShoppingCart(shoppingCart);
      accionTrigger(false);
    }
  }, [
    accionTrigger,
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
          <IonSegmentButton
            value="finishOrder"
            disabled={
              shoppingProducts
                ? shoppingProducts.total > 0
                  ? false
                  : true
                : true
            }
          >
            <IonIcon src={"assets/icons/purchaseOrderOutline.svg"} />
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
      {segmentValue ? (
        <IonContent>
          {segmentValue === "shoppingCart" ? (
            <div>
              <IonToolbar color="primary">
                <IonTitle>
                  {provider ? provider.firstName.toUpperCase() : null}
                </IonTitle>
              </IonToolbar>
              <IonList class="cartItem">
                <IonListHeader>
                  <IonTitle color="primary">Mis productos</IonTitle>
                </IonListHeader>
                {shoppingProducts
                  ? shoppingProducts.products.map(
                      (shoppingProduct: ShoppingProduct) => {
                        const oldprice =
                          (shoppingProduct.price +
                            shoppingProduct.salving /
                              shoppingProduct.quantity) *
                          shoppingProduct.quantity;
                        const price =
                          shoppingProduct.price * shoppingProduct.quantity;
                        const percent = Math.round((1 - price / oldprice) * 100);
                        return (
                          <IonItemSliding key={shoppingProduct._id}>
                            <IonItem>
                              <IonThumbnail class="ion-align-self-start">
                                <IonImg src={shoppingProduct.urlImage}></IonImg>
                              </IonThumbnail>
                              {shoppingProduct.quantity === 0 ||
                              shoppingCart[shoppingProduct._id] === 0 ? (
                                <>
                                  <IonLabel class="ion-padding-self-start ion-margin-vertical">
                                    Producto Agotado
                                  </IonLabel>
                                  <IonButton
                                    color={"white"}
                                    class="cartBtn"
                                    size="small"
                                    fill="outline"
                                    onClick={() => {
                                      const products = handleProducts(
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
                              ) : (
                                <>
                                  <IonLabel class="ion-align-self-center">
                                    <IonText color={"steel"}>
                                      <p>{shoppingProduct.productName}</p>
                                    </IonText>
                                    <IonText color="dark">
                                      <p>
                                        <strong>
                                          ${price.toLocaleString()}
                                          {shoppingProduct.salving > 0 ? (
                                            <IonText color="steel">
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
                                          color={"secondary"}
                                        >
                                          -{percent}%
                                        </IonButton>
                                      </IonLabel>
                                    ) : null}
                                    {shoppingCart[shoppingProduct._id] ===
                                    shoppingProduct.totalAmount ? (
                                      <IonLabel class="ion-align-self-start">
                                        <p>Max (Und) permitidas</p>
                                      </IonLabel>
                                    ) : null}
                                  </IonLabel>
                                  <IonLabel class="ion-align-self-end ion-margin-vertical">
                                    <IonButton
                                      color={"white"}
                                      class="cartBtn"
                                      size="small"
                                      fill="outline"
                                      onClick={() => {
                                        const products = handleProducts(
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
                                        if (
                                          shoppingCart[shoppingProduct._id] <
                                          shoppingProduct.totalAmount
                                        ) {
                                          const products = handleProducts(
                                            shoppingProduct._id!,
                                            "Add",
                                            shoppingCart
                                          );
                                          setShoppingCart((prevState: any) => ({
                                            ...prevState,
                                            ...products,
                                          }));
                                        }
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
                                </>
                              )}
                            </IonItem>
                            <IonItemOptions
                              onIonSwipe={() => {
                                const pendingShopingCar = shoppingCart;
                                delete pendingShopingCar[
                                  `${shoppingProduct?._id}`
                                ];
                                setShoppingCart((prevState: any) => ({
                                  ...prevState,
                                  ...pendingShopingCar,
                                }));
                              }}
                            >
                              <IonItemOption color="danger"
                               onClick={() => {
                                const pendingShopingCar = shoppingCart;
                                delete pendingShopingCar[
                                  `${shoppingProduct?._id}`
                                ];
                                setShoppingCart((prevState: any) => ({
                                  ...prevState,
                                  ...pendingShopingCar,
                                }));
                              }}>
                                <IonIcon
                                  slot="top"
                                  src={trashBinSharp}
                                ></IonIcon>
                                Eliminar
                              </IonItemOption>
                            </IonItemOptions>
                          </IonItemSliding>
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
                setShoppingCart({});
              }}
            ></ResumeContainer>
          ) : null}
        </IonContent>
      ) : null}
      {segmentValue === "shoppingCart" ? (
        <IonFooter>
          <IonToolbar>
            <IonTitle>
              SubTotal: $
              {shoppingProducts
                ? shoppingProducts.total.toLocaleString()
                : null}
            </IonTitle>
            <IonButton
              disabled={
                shoppingProducts
                  ? shoppingProducts.total > 0
                    ? false
                    : true
                  : true
              }
              onClick={() => {
                setSegmentValue("finishOrder");
              }}
              expand="full"
            >
              Finalizar orden
            </IonButton>
          </IonToolbar>
        </IonFooter>
      ) : null}
    </>
  );
};

export default ListContainer;
