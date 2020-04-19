/* eslint-disable array-callback-return */
import React, { useState, useCallback, useEffect } from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonRow,
  IonGrid,
  IonCol,
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
interface ContainerProps {
  [id: string]: any;
}

const ListContainer: React.FC<ContainerProps> = ({
  loadData,
  inputs,
  currentUser,
  provider,
  refreshData,
}) => {
  let productCart: any = {};
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Array<any>>([{}]);
  const [dataModal, setDataModal] = useState<Product>();
  const [showModal, setShowModal] = useState(false);
  const [shoppingCart, setShoppingCart] = useState<any>({});
  const [flagRefresh, setFlagRefresh] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState(false);
  const addNewProduct = () => {
    const newProduct: Product = {
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
  function handleShoppingCart(data: any) {
    setShoppingCart(data);
  }
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
      }
    },
    [inputs, searchText]
  );
  const handleCloseModal = (data: any) => {
    if (data.hasChanges) {
      refreshData(true);
    }
    setShowModal(false);
  };

  const handleProductCart = useCallback(
    (property: string, operation: string) => {
      try {
        setFlagRefresh(false);
        let pendingShopingCar = shoppingCart;
        if (operation === "Add" && shoppingCart[`${property}`] >= 0) {
          productCart[`${property}`] = shoppingCart[`${property}`] + 1;
          setShoppingCart((prevState: any) => ({
            ...prevState,
            ...productCart,
          }));
        } else if (operation === "Less" && shoppingCart[`${property}`] > 0) {
          productCart[`${property}`] = shoppingCart[`${property}`] - 1;
          if (productCart[`${property}`] === 0) {
            delete pendingShopingCar[`${property}`];
            setShoppingCart(pendingShopingCar);
          } else {
            setShoppingCart((prevState: any) => ({
              ...prevState,
              ...productCart,
            }));
          }
        } else if (operation !== "Less") {
          productCart[`${property}`] = 1;
          setShoppingCart((prevState: any) => ({
            ...prevState,
            ...productCart,
          }));
        }
      } catch (e) {
        console.error(e);
      }
    },
    [productCart, shoppingCart]
  );
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
    refUserCar(currentUser, provider).on("value", (snapshot: any) => {
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
            hidden={!loadData}
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
                {data[category].map((input: any, index: number) => {
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
                        <IonGrid>
                          <IonRow>
                            <IonCol>
                              <IonItem>
                                <IonText color={"dark"}>
                                  <h2>
                                    <strong>
                                      {!input.promotionPrice ? (
                                        input.price.toLocaleString()
                                      ) : input.promotionPrice ? (
                                        <s>{input.price.toLocaleString()}</s>
                                      ) : (
                                        ""
                                      )}
                                    </strong>
                                  </h2>
                                  {input ? (
                                    input.promotionPrice ? (
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
                            </IonCol>
                            <IonCol
                              hidden={
                                currentUser.roles.includes(
                                  config.RolProviderAccess
                                )
                                  ? false
                                  : true
                              }
                            >
                              <IonItem>
                                <IonLabel>
                                  <h2> </h2>
                                  <h2>{`Total:    ${input.totalAmount}${input.measureType}`}</h2>
                                  <h3>{`Estado: ${
                                    input.enabled
                                      ? "Habilitado"
                                      : "Inhabilitado"
                                  }`}</h3>
                                  <p>{`Codigo de Producto:  ${input.code}`}</p>
                                </IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
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
                      <IonItem
                        hidden={
                          currentUser.roles.includes(config.RolUserAccess)
                            ? false
                            : true
                        }
                        class="cardSlideBtn  text-center"
                      >
                        {!shoppingCart[`${input._id}`] ? (
                          <IonButton
                            disabled={input.totalAmount !== 0 ? false : true}
                            fill="outline"
                            color="primary"
                            onClick={() => {
                              if (
                                input.totalAmount >
                                  shoppingCart[`${input._id}`] ||
                                input.totalAmount !== 0
                              ) {
                                handleProductCart(input._id, "Add");
                                setFlagRefresh(true);
                              }
                            }}
                          >
                            Agregar
                          </IonButton>
                        ) : (
                          <>
                            <IonButton
                              size="small"
                              fill="outline"
                              onClick={() => {
                                handleProductCart(input._id, "Less");
                              }}
                            >
                              <IonIcon slot="icon-only" icon={removeSharp} />
                            </IonButton>
                            <IonText>
                              <strong>{`${
                                shoppingCart[`${input._id}`]
                                  ? shoppingCart[`${input._id}`]
                                  : ""
                              }`}</strong>
                            </IonText>
                            <IonButton
                              size="small"
                              fill="outline"
                              onClick={() => {
                                if (
                                  input.totalAmount >
                                  shoppingCart[`${input._id}`]
                                ) {
                                  handleProductCart(input._id, "Add");
                                }
                              }}
                            >
                              <IonIcon slot="icon-only" icon={addSharp} />
                            </IonButton>
                          </>
                        )}
                      </IonItem>
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
              provider={provider}
              oldShoppingCart={shoppingCart}
              currentUser={currentUser}
              changeShoppingCart={handleShoppingCart}
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
interface Product {
  _id?: string;
  enabled: boolean;
  keyImage: string;
  measureType: "Lb" | "Kg" | "Und" | "notSet";
  price: number;
  productName: string;
  productType: string;
  provider: string;
  totalAmount: number;
  urlImage: string;
  code?: number;
  brand?: string;
  features?: string;
  promotionPrice?: number;
}

export default ListContainer;
