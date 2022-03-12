/* eslint-disable array-callback-return */
import React, { useState, useCallback, useEffect } from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
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
  IonCardContent,
  IonItemDivider,
  IonAlert,
} from "@ionic/react";
import {
  addSharp,
  removeSharp,
  cart,
  addCircle,
  cartOutline,
} from "ionicons/icons";
import "./ListContainer.css";
import CreateComponent from "./CreateComponent";
import config from "../../config";
import { refUserCar } from "../../config/firebase";
import ShoppingListContainer from "./shopingCart/ListContainer";
import { Product } from "../../entities";
import handleProducts from "./shopingCart/handleProducts";
import * as H from "history";
import { witchDevice } from "../../hooks/WitchDevice";
interface ContainerProps {
  [id: string]: any;
  inputs: Array<Product>;
  history: H.History;
}
const emptyProduct: Product = {
  _id: "",
  enabled: true,
  keyImage: "",
  measureType: "notSet",
  price: 0,
  productName: "",
  productType: "",
  provider: "",
  totalAmount: 0,
  urlImage: "",
  code: 0,
  brand: "",
  features: "",
  promotionPrice: 0,
  promotionExpires: new Date(),
  quantity: 0,
};
const ListContainer: React.FC<ContainerProps> = ({
  history,
  inputs,
  currentUser,
  provider,
  refreshData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Array<any>>();
  const [dataModal, setDataModal] = useState<Product>(emptyProduct);
  const [showModal, setShowModal] = useState(false);
  const [shoppingCart, setShoppingCart] = useState<any>({});
  const [flagRefresh, setFlagRefresh] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState(false);
  const [device, setDevice] = useState("");
  const [hiddenFeatures, setHiddenFeatures] = useState<any>({});
  const today = new Date().toLocaleString();
  const [showAlert, setShowAlert] = useState(false);

  const alert = (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header={"Promoción"}
      message={`<img src="${provider?.promoBanner}" alt="g-maps" style="border-radius: 2px">`}
      buttons={[
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Confirmar",
        },
      ]}
    />
  );
  const addNewProduct = () => {
    setDataModal(emptyProduct);
    setShowModal(true);
  };
  const groupBy = (key: React.ReactText) => (array: any[]) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

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
        const newgroups = groupByType(newData);
        if (newgroups) {
          setData(newgroups);
        }
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


  useEffect(() => {
    setFlagRefresh(true);
  }, [shoppingCart]);

  useEffect(() => {
    setShowAlert(
      provider.promoBanner && currentUser.roles?.includes(config.RolUserAccess)
        ? true
        : false
    );
    async function fetchData() {
      const device = await witchDevice();
      setDevice(device);
    }
    fetchData();
    const groupByType = groupBy("productType");
    if (inputs) {
      setData(groupByType(inputs));
    }
    const fireProductCart: any = {};
    refUserCar(currentUser._id, provider._id).on("value", (snapshot: any) => {
      snapshot.forEach((snap: any) => {
        fireProductCart[snap.key] = snap.val();
      });
      setShoppingCart(fireProductCart);
    });
  }, [currentUser, inputs, provider]);
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    nested: true,
    cssMode: true,
  };

  const renderAddButton = () => {
    if (currentUser.roles?.includes(config.RolProviderAccess)) {
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
    return (
      <>
        {alert}
        {renderAddButton()}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          animated={true}
          backdropDismiss={false}
        >
          <IonContent>
            <CreateComponent
              provider={provider}
              prod={dataModal}
              action={handleCloseModal}
            ></CreateComponent>
          </IonContent>
        </IonModal>
        {data ? (
          <>
            <IonToolbar color="primary">
              <IonTitle>
                <h1>{provider.firstName.toUpperCase()}</h1>
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
              color="secondary"
                ion-menu-toggle={showPopover}
                onClick={() => {
                  setShowPopover(true);
                }}
              >
                <IonIcon icon={cart} />
                <IonBadge color="secondary">
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

            {Object.keys(data).map((category: any, index) => {
              if (!data[category].length) {
                return (
                  <IonCard key={index}>
                    <IonText color="primary">Cargando</IonText>
                  </IonCard>
                );
              }
              const cards: Array<any> = [];
              return (
                <div key={index}>
                  <IonToolbar>
                    <IonTitle>{category}</IonTitle>
                  </IonToolbar>
                  {data[category].map((input: Product, index: number) => {
                    let DatePromotion = "";
                    if (input.promotionExpires) {
                      DatePromotion = new Date(
                        input.promotionExpires
                      ).toLocaleString();
                    }
                    if (!input.productName) {
                      return (
                        <IonCard key={index}>
                          <IonText color="primary">Cargando</IonText>
                        </IonCard>
                      );
                    }
                    const card = (
                      <div key={index} className="ion-margin-bottom">
                        <IonCard
                          class="ion-margin-bottom"
                          onClick={() => {
                            if (currentUser) {
                              if (
                                currentUser.roles?.includes(
                                  config.RolProviderAccess
                                )
                              ) {
                                setShowModal(true);
                                setDataModal(input);
                              }
                            }
                          }}
                        >
                          {input.promotionPrice && DatePromotion >= today ? (
                            <IonItem lines="none">
                              <IonBadge slot="end" color={"secondary"}>
                                -
                                {Math.round(
                                  (1 - input.promotionPrice / input.price) * 100
                                )}
                                %
                              </IonBadge>
                            </IonItem>
                          ) : null}
                          <IonCardHeader class="ion-no-margin ion-no-padding">
                            <IonImg
                              class="cardSlideImage"
                              src={input.urlImage}
                            />
                            <IonToolbar
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
                                {input.totalAmount <= 0
                                  ? "  Agotado"
                                  : input.totalAmount < 10
                                  ? "¡Quedan Pocas Unidades!"
                                  : null}
                              </strong>
                            </IonToolbar>
                          </IonCardHeader>
                          <IonCardContent class="ion-no-margin ion-no-padding">
                            <IonItem lines="none">
                              <IonText color={"dark"}>
                                <div>
                                  {!(
                                    input.promotionPrice &&
                                    DatePromotion >= today
                                  ) ? (
                                    <strong>
                                      ${input.price.toLocaleString()}
                                    </strong>
                                  ) : input.promotionPrice ? (
                                    <strong>
                                      ${input.promotionPrice.toLocaleString()}
                                      <small>
                                        <IonText color={"steel"}>
                                          <s>${input.price.toLocaleString()}</s>
                                        </IonText>
                                      </small>
                                    </strong>
                                  ) : null}
                                </div>
                                {input.promotionPrice &&
                                DatePromotion >= today ? (
                                  <IonLabel color="secundary">
                                    <h6>
                                      Ahorre:
                                      <strong>
                                        $
                                        {(
                                          input.price - input.promotionPrice
                                        ).toLocaleString()}
                                      </strong>
                                    </h6>
                                  </IonLabel>
                                ) : null}
                                <h6>{input.productName}</h6>
                                {`1 (${input.measureType})`}

                                <IonButton
                                  hidden={
                                    hiddenFeatures[`${input._id}`]
                                      ? hiddenFeatures[`${input._id}`]
                                      : false
                                  }
                                  onClick={() => {
                                    const feature: any = {};
                                    if (input._id) {
                                      feature[input._id] = true;
                                      setHiddenFeatures(feature);
                                    }
                                  }}
                                  class="ion-float-left"
                                  fill="clear"
                                >
                                  <small>Ver detalles</small>
                                </IonButton>
                                <IonText
                                  class="ion-text-justify"
                                  hidden={
                                    hiddenFeatures[`${input._id}`]
                                      ? !hiddenFeatures[`${input._id}`]
                                      : true
                                  }
                                >
                                  <p>
                                    <small>{input.features}</small>
                                  </p>
                                </IonText>
                              </IonText>
                            </IonItem>

                            <IonItem
                            lines='none'
                              hidden={
                                currentUser.roles?.includes(
                                  config.RolProviderAccess
                                )
                                  ? false
                                  : true
                              }
                            >
                              <IonText color={"steel"}>
                            <h2>{"Total:"}<strong>{` ${input.totalAmount} ${input.measureType}`}</strong></h2>
                                <h3>{"Estado: "}<small>{
                                  input.enabled ? "Habilitado" : "Inhabilitado"
                                }</small></h3>
                                <p>{"Cod Producto: "}<small>{input.code}</small></p>
                              </IonText>
                            </IonItem>
                          </IonCardContent>

                          <div
                            className="ion-justify-content-center ion-margin-bottom"
                            hidden={
                              currentUser.roles?.includes(config.RolUserAccess)
                                ? false
                                : true
                            }
                          >
                            {!shoppingCart[`${input._id}`] ? (
                              <IonButton
                                class="ion-justify-content-center ion-margin-bottom"
                                size={"small"}
                                hidden={input.totalAmount !== 0 ? false : true}
                                fill="outline"
                                color="primary"
                                onClick={() => {
                                  if (
                                    input.totalAmount >
                                      shoppingCart[`${input._id}`] ||
                                    input.totalAmount !== 0
                                  ) {
                                    const products = handleProducts(
                                      input._id,
                                      "Add",
                                      shoppingCart
                                    );
                                    setShoppingCart((prevState: any) => ({
                                      ...prevState,
                                      ...products,
                                    }));
                                    setFlagRefresh(true);
                                  }
                                }}
                              >
                                <IonIcon
                                  slot="start"
                                  icon={cartOutline}
                                ></IonIcon>
                                Agregar
                              </IonButton>
                            ) : (
                              <div className="ion-justify-content-center ion-margin-bottom">
                                <IonItemDivider>
                                  <IonButton
                                    size={"small"}
                                    fill="outline"
                                    onClick={() => {
                                      const products = handleProducts(
                                        input._id,
                                        "Less",
                                        shoppingCart
                                      );
                                      setShoppingCart((prevState: any) => ({
                                        ...prevState,
                                        ...products,
                                      }));
                                      setFlagRefresh(true);
                                    }}
                                  >
                                    <IonIcon
                                      slot="icon-only"
                                      icon={removeSharp}
                                    />
                                  </IonButton>
                                  <IonButton
                                    color={"white"}
                                    size={"small"}
                                    fill="clear"
                                  >
                                    <IonText color={"primary"}>
                                      <strong>{`${
                                        shoppingCart[`${input._id}`]
                                      }`}</strong>
                                    </IonText>
                                  </IonButton>
                                  <IonButton
                                    size={"small"}
                                    fill="outline"
                                    onClick={() => {
                                      if (
                                        input.totalAmount >
                                        shoppingCart[`${input._id}`]
                                      ) {
                                        const products = handleProducts(
                                          input._id,
                                          "Add",
                                          shoppingCart
                                        );
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
                                </IonItemDivider>
                              </div>
                            )}
                          </div>
                        </IonCard>
                      </div>
                    );

                    cards.push(card);
                    if (index === data[category].length - 1) {
                      const chunkSize =
                        device === "android" || device === "ios" ? 2 : 3;
                      const groups = cards
                        .map(function (e, i) {
                          return i % chunkSize === 0
                            ? cards.slice(i, i + chunkSize)
                            : null;
                        })
                        .filter(function (e) {
                          return e;
                        });
                      return (
                        <IonSlides key={index} options={slideOpts} pager={true}>
                          <>
                            {groups.map((group: any, index) => {
                              return <IonSlide key={index}>{group}</IonSlide>;
                            })}
                          </>
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
              onDidDismiss={() => setShowPopover(false)}
              animated={true}
              id={"modal"}
            >
              <ShoppingListContainer
                history={history}
                provider={provider}
                oldShoppingCart={shoppingCart}
                currentUser={currentUser}
                changeShoppingCart={(response: any) => {
                  setShoppingCart(response);
                }}
                accionTrigger={(response: boolean) => {
                  handleCloseModal(response);
                }}
              ></ShoppingListContainer>
            </IonModal>
          </>
        ) : null}
      </>
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};


export default ListContainer;
