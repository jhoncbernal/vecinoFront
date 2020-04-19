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
} from "@ionic/react";
import { ShoppingOrder, ShoppingProduct } from "../../../entities";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import handleProducts from "./handleProducts";
import { removeSharp, addSharp } from "ionicons/icons";
import { pushFirebase } from "../../../config/firebase";

interface ContainerProps {
  [id: string]: any;
}

const ListContainer: React.FC<ContainerProps> = ({
  provider,
  oldShoppingCart,
  currentUser,
  changeShoppingCart,
}) => {
  const [shoppingProducts, setShoppingProducts] = useState<ShoppingOrder>();
  const [shoppingCart, setShoppingCart] = useState<any>(oldShoppingCart);
  const getProducts = useCallback(async (shoppingCart) => {
    let pathUrl = `${
      config.ProductContext
    }/productsPrice/1?productsIds=${JSON.stringify(shoppingCart)}`;
    await HttpRequest(pathUrl, "GET", "", true)
      .then(async (response: ShoppingOrder) => {
        console.log(response);
        setShoppingProducts(response);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  useEffect(() => {
    pushFirebase(currentUser, provider._id, shoppingCart);
    changeShoppingCart(shoppingCart);
    getProducts(shoppingCart);
  }, [changeShoppingCart, currentUser, getProducts, provider._id, shoppingCart]);
  return (
    <>
      <IonContent>
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
                    (shoppingProduct.price + (shoppingProduct.salving/ shoppingProduct.quantity)) *
                    shoppingProduct.quantity;
                  let price = shoppingProduct.price * shoppingProduct.quantity;
                  let percent =Math.round((1-(price/oldprice))*100);
                  return (
                    <IonItem key={shoppingProduct._id}>
                      <IonThumbnail class="cartImages">
                        <IonImg src={shoppingProduct.urlImage}></IonImg>
                      </IonThumbnail>
                      <IonLabel item-left>
                        <IonText color={"dark"}>
                          <p>{shoppingProduct.productName}</p>
                        </IonText>
                        <IonText color="primary">
                          <p>
                            <strong>
                              ${price.toLocaleString()}
                              {shoppingProduct.salving > 0 ? (
                                <IonText color="dark">
                                  &nbsp;<s>{`$${oldprice.toLocaleString()}`}</s>
                                </IonText>
                              ) : null}
                            </strong>
                          </p>
                        </IonText>
                        {shoppingProduct.salving >0?<IonButton disabled={true} shape={"round"} color={'primary'} >-{percent}%</IonButton>:null}
                      </IonLabel>
                      <IonLabel item-right text-right>
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
                            let products = handleProducts(
                              shoppingProduct._id!,
                              "Add",
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
                            icon={addSharp}
                          />
                        </IonButton>
                      </IonLabel>
                    </IonItem>
                  );
                }
              )
            : null}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            SubTotal: ${shoppingProducts ? shoppingProducts.total.toLocaleString() : null}
          </IonTitle>
          <IonButton
            
            expand="full"
          >
            Finalizar compra{" "}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default ListContainer;
