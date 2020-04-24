/* eslint-disable array-callback-return */
import React, { useState, useCallback, useEffect } from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonText,
  IonModal,
  IonFab,
  IonFabButton,
  IonCardHeader,
  IonImg,
  IonButton,
  IonSlides,
  IonSlide,
  IonBadge,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { addSharp, removeSharp, cart, addCircle } from "ionicons/icons";
import "./ListContainer.css";
import CreateComponent from "./CreateComponent";
import config from "../../config";
import { refUserCar } from "../../config/firebase";
import ShoppingListContainer from "./shopingCart/ListContainer";
import { Product } from "../../entities";
import handleProducts from "./shopingCart/handleProducts";
import * as H from 'history';
interface ContainerProps {
  [id: string]: any;
  inputs:Array<Product>,
  history:H.History;
}

const ListContainer: React.FC<ContainerProps> = ({
  history,
  loadData,
  inputs,
  currentUser,
  provider,
  refreshData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Array<any>>([{}]);
  const [dataModal, setDataModal] = useState<Product>();
  const [showModal, setShowModal] = useState(false);
  const [shoppingCart, setShoppingCart] = useState<any>({});
  const [flagRefresh, setFlagRefresh] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState(false);

  var today = new Date().toLocaleString();;
  const addNewProduct = () => {
    const newProduct: any = {
      enabled: false,
      keyImage: "",
      measureType: "notSet",
      price: 0,
      productName: "",
      productType: "",
      provider: "",
      totalAmount: 0,
      urlImage: "",
    };
    setShowModal(true);
    setDataModal(newProduct);
  };


  const handleSearch = useCallback(
    async (e: any) => {
      try {
        setFlagRefresh(false);
        setSearchText(e.detail.value!);
        let newData;
        if (e.detail.value! === "") {
          newData = inputs;
        } else {
          newData = inputs.filter((item: any) => {
            let itemData = `${item.productType.toUpperCase()} 
          ${item.productName.toUpperCase()}
          ${item.measureType.toUpperCase()}
          ${item.price.toString().toUpperCase()}
          ${item.totalAmount.toString().toUpperCase()}
          ${item.features.toUpperCase()}`;
            if (item.promotionPrice) {
              itemData =
                itemData + `${item.promotionPrice.toString().toUpperCase()}`;
            }
            if (item.brand) {
              itemData = itemData + `${item.brand.toUpperCase()}`;
            }
            const textData = searchText.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
        }
        const groupByType = groupBy("productType");
        setData(groupByType(newData));
        setFlagRefresh(true);
      } catch (e) {
        console.error(e);
        history.go(0);
      }
    },
    [history, inputs, searchText]
  );
  const handleCloseModal = (data: any) => {
    if (!data) {
      setShowPopover(data);
    } else {
      if (data.hasChanges) {
        refreshData(true);
      }
      setShowModal(false);
    }
  };

  const groupBy = (key: React.ReactText) => (array: any[]) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  useEffect(() => {
    setFlagRefresh(true);
  }, [shoppingCart]);

  useEffect(() => {
    const groupByType = groupBy("productType");
    setData(groupByType(inputs));
    let fireProductCart: any = {};
    refUserCar(currentUser._id, provider._id).on("value", (snapshot: any) => {
      snapshot.forEach((snap: any) => {
        fireProductCart[snap.key] = snap.val();
      });
      setShoppingCart(fireProductCart);
    });
  }, [currentUser, inputs, provider]);
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  const renderAddButton = () => {
    if (currentUser.roles.includes(config.RolProviderAccess)) {
      return (
        <IonButton
          expand="full"
          onClick={() => {
            addNewProduct();
          }}
        >
          <IonIcon icon={addCircle}></IonIcon>
          Agregar nuevo producto
        </IonButton>
      );
    }
  };

  try {
    if (inputs.length > 0) {
      return (
        <>
          <IonToolbar color="primary">
            <IonTitle>
              <h1>{provider.firstName}</h1>
            </IonTitle>
          </IonToolbar>

          <IonFab
            vertical="top"
            horizontal="end"
            slot="fixed"
            hidden={
              shoppingCart
                ? Object.keys(shoppingCart).length
                  ? false
                  : true
                : true
            }
          >
            <IonFabButton
              ion-menu-toggle={showPopover}
              onClick={() => {
                setShowPopover(true);
              }}
            >
              <IonIcon icon={cart} />
              <IonBadge color="primary">
                {flagRefresh
                  ? Object.keys(shoppingCart).length
                  : Object.keys(shoppingCart).length}
              </IonBadge>
            </IonFabButton>
          </IonFab>
          <IonSearchbar
            animated={true}
            value={searchText}
            onIonChange={(e) => {
              handleSearch(e);
            }}
            showCancelButton="always"
          ></IonSearchbar>
          {renderAddButton()}
          {Object.keys(data).map((category: any, index) => {
            if (!data[category].length) {
              return (
                <IonCard key={index}>
                  <IonText color="primary">Cargando</IonText>
                </IonCard>
              );
            }
            let cards: Array<any> = [];
            return (
              <div key={index}>
                <IonToolbar>
                  <IonTitle>{category}</IonTitle>
                </IonToolbar>
                {data[category].map((input: Product, index: number) => {
                  let DatePromotion:string='';
                  if(input.promotionExpires){
                    DatePromotion=new Date(input.promotionExpires).toLocaleString();;
                }
                  if (!input.productName) {
                    return (
                      <IonCard key={index}>
                        <IonText color="primary">Cargando</IonText>
                      </IonCard>
                    );
                  }
                  const card = (
                    <IonCard key={index} class="cardSlide">
                      <IonImg class="cardSlideImage" src={input.urlImage} />
                      <IonCardHeader
                        color={
                          input.totalAmount <= 0
                            ? "danger"
                            : input.totalAmount < 10
                            ? "secondary"
                            : "primary"
                        }
                        hidden={input.totalAmount < 10 ? false : true}
                      >
                        <strong>
                          {" "}
                          {input.totalAmount <= 0
                            ? "  Agotado"
                            : input.totalAmount < 10
                            ? "¡Quedan Pocas Unidades!"
                            : ""}
                        </strong>
                      </IonCardHeader>
                      <IonCardContent
                        class="cardSlideText"
                        onClick={() => {
                          if (currentUser) {
                            if (
                              currentUser.roles.includes(
                                config.RolProviderAccess
                              )
                            ) {
                              setShowModal(true);
                              setDataModal(input);
                            }
                          }
                        }}
                      >
                        <IonItem class="ion-padding-start">
                          <IonText color={"dark"}>
                            <h2>
                              <strong>
                                {!(input.promotionPrice&&  DatePromotion>=today) ? (
                                  input.price.toLocaleString()
                                ) : input.promotionPrice ? (
                                  <s>{input.price.toLocaleString()}</s>
                                ) : (
                                  ""
                                )}
                              </strong>
                            </h2>
                            {input ? (
                              (input.promotionPrice&&  DatePromotion>=today) ? (
                                <IonText>
                                  <h2 color="dark">
                                    Precio de Oferta:{" "}
                                    <strong>
                                      {input.promotionPrice.toLocaleString()}
                                    </strong>
                                  </h2>
                                </IonText>
                              ) : null
                            ) : null}
                            <IonLabel>
                              <h3>
                                {input ? input.productType : ""}{" "}
                                {input ? input.productName : ""}{" "}
                              </h3>
                              <p>{`1 (${input.measureType})`}</p>
                            </IonLabel>
                            <p>{input ? input.features : ""}</p>
                          </IonText>
                        </IonItem>

                        <IonItem
                          class="ion-padding-start"
                          hidden={
                            currentUser.roles.includes(config.RolProviderAccess)
                              ? false
                              : true
                          }
                        >
                          <IonLabel>
                            <h2> </h2>
                            <h2>{`Total:    ${input.totalAmount}${input.measureType}`}</h2>
                            <h3>{`Estado: ${
                              input.enabled ? "Habilitado" : "Inhabilitado"
                            }`}</h3>
                            <p>{`Codigo de Producto:  ${input.code}`}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCardContent>
                      <IonModal
                        isOpen={showModal}
                        onDidDismiss={(e) => setShowModal(false)}
                        animated={true}
                      >
                        <IonContent>
                          <CreateComponent
                            product={dataModal}
                            action={handleCloseModal}
                          ></CreateComponent>
                        </IonContent>
                      </IonModal>
                      <div
                        hidden={
                          currentUser.roles.includes(config.RolUserAccess)
                            ? false
                            : true
                        }
                      >
                        {!shoppingCart[`${input._id}`] ? (
                          <IonButton
                            class="ion-float-left	ion-margin-bottom"
                            size={"small"}
                            disabled={input.totalAmount !== 0 ? false : true}
                            fill="outline"
                            color="primary"
                            onClick={() => {
                              if (
                                input.totalAmount >
                                  shoppingCart[`${input._id}`] ||
                                input.totalAmount !== 0
                              ) {
                                let products = handleProducts(input._id?input._id:'', "Add",shoppingCart);
                                setShoppingCart((prevState: any) => ({
                                  ...prevState,
                                  ...products,
                                }));
                                setFlagRefresh(true);
                              }
                            }}
                          >
                            Agregar
                          </IonButton>
                        ) : (
                          <>
                            <IonButton
                              class="ion-float-left	ion-margin-bottom"
                              size={"small"}
                              fill="outline"
                              onClick={() => {
                                let products = handleProducts(input._id?input._id:'', "Less",shoppingCart);
                                setShoppingCart((prevState: any) => ({
                                  ...prevState,
                                  ...products,
                                }));
                                setFlagRefresh(true);
                              }}
                            >
                              <IonIcon slot="icon-only" icon={removeSharp} />
                            </IonButton>
                            <IonButton
                              color={"white"}
                              size={"small"}
                              class="ion-float-left ion-margin-bottom"
                              fill="outline"
                            >
                              <IonText color={"primary"}>
                                <strong>{`${
                                  shoppingCart[`${input._id}`]
                                    ? shoppingCart[`${input._id}`]
                                    : ""
                                }`}</strong>
                              </IonText>
                            </IonButton>
                            <IonButton
                              class="ion-float-left	ion-margin-bottom"
                              size={"small"}
                              fill="outline"
                              onClick={() => {
                                if (
                                  input.totalAmount >
                                  shoppingCart[`${input._id}`]
                                ) {
                                  let products = handleProducts(input._id?input._id:'', "Add",shoppingCart);
                                  setShoppingCart((prevState: any) => ({
                                    ...prevState,
                                    ...products,
                                  }));
                                   setFlagRefresh(true);
                                }
                              }}
                            >
                              <IonIcon slot="icon-only" icon={addSharp} />
                            </IonButton>
                          </>
                        )}
                      </div>
                    </IonCard>
                  );

                  cards.push(card);
                  if (index === data[category].length - 1) {
                    var chunk_size = 2;
                    var groups = cards
                      .map(function (e, i) {
                        return i % chunk_size === 0
                          ? cards.slice(i, i + chunk_size)
                          : null;
                      })
                      .filter(function (e) {
                        return e;
                      });
                    return (
                      <IonSlides key={index} options={slideOpts} id="card">
                        {groups.map((group: any, index) => {
                          return <IonSlide key={index}>{group}</IonSlide>;
                        })}
                      </IonSlides>
                    );
                  }
                })}
              </div>
            );
          })}
          <IonModal
            isOpen={showPopover}
            swipeToClose={true}
            onDidDismiss={(e) => setShowPopover(false)}
            animated={true}
            id={"modal"}
          >
            <ShoppingListContainer
            history={history}
              provider={provider}
              oldShoppingCart={shoppingCart}
              currentUser={currentUser}
              changeShoppingCart
              ={(response: any) => {
                setShoppingCart(response);
              }}
              accionTrigger={(response: boolean) => {
                handleCloseModal(response);
              }}
            ></ShoppingListContainer>
          </IonModal>
        </>
      );
    } else {
      return (
        <>
          <h1>
            <IonText color="primary">Sin conexion</IonText>
          </h1>
        </>
      );
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default ListContainer;
