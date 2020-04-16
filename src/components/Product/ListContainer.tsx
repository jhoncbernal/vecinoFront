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
  IonContent,
  IonBadge,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { arrowBackOutline, addSharp, removeSharp, cart } from "ionicons/icons";
import UpdateProvider from "./UpdateContainer";
import "./ListContainer.css"
interface ContainerProps {
  loaddata: boolean;
  inputs: Array<any>;
  currentUser: any;
  provider: any;
}

const ListContainer: React.FC<ContainerProps> = ({
  loaddata,
  inputs,
  currentUser,
  provider
}) => {
  let productCart: any = {};
  const [searchText, setSearchText] = useState("");
  const [data, setdata] = useState<Array<any>>([{}]);
  const [dataModal, setdataModal] = useState<Array<any>>([{}]);
  const [showModal, setShowModal] = useState(false);
  const [shopingCart, setShopingCart] = useState<any>({});
  const [flagRefresh, setflagRefresh] = useState<boolean>(false);
  const handleSearch = useCallback(
    async (e: any) => {
      try {
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
        console.log('newData', newData);
        const groupByType = groupBy('productType');
        setdata(groupByType(newData));
      } catch (e) {
        console.error(e);
      }
    },
    [inputs, searchText]
  );

  const handleProductCart = useCallback(
    (property: string, operation: string) => {
    
      try {
        setflagRefresh(false);
        let pendingShopingCar = shopingCart;
        if (operation === "Add" && shopingCart[`${property}`] >= 0) {
          productCart[`${property}`] = shopingCart[`${property}`] + 1;
          setShopingCart((prevState: any) => ({
            ...prevState,
            ...productCart,
          }));
        } else if (operation === "Less" && shopingCart[`${property}`] > 0) {
          
          productCart[`${property}`] = shopingCart[`${property}`] - 1;
          if (productCart[`${property}`] === 0) {
            delete pendingShopingCar[`${property}`];
            console.log('delete', pendingShopingCar)
            setShopingCart(pendingShopingCar);
          }else{
          setShopingCart((prevState: any) => ({
            ...prevState,
            ...productCart,
          }));
        }
        } else if(operation !== "Less") {
          productCart[`${property}`] = 1;
          setShopingCart((prevState: any) => ({
            ...prevState,
            ...productCart,
          }));
        }
      } catch (e) {
        console.error(e);
      }
    },
    [productCart, shopingCart]
  );
  const groupBy = (key: React.ReactText) => (array: any[]) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  useEffect(() => {
    console.log(shopingCart);
    setflagRefresh(true);
  }, [shopingCart]);

  useEffect(() => {
    const groupByType = groupBy('productType');
    setdata(groupByType(inputs));
  }, [inputs]);
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  try {
    if (inputs.length > 0) {

      return (
        <>
          <IonToolbar color='primary'>
            <IonTitle><h1>{provider.firstName}</h1></IonTitle>
          </IonToolbar>
          <IonFab vertical="top" horizontal="end" slot="fixed" hidden={Object.keys(shopingCart).length ? false : true}>
            <IonFabButton>
              <IonIcon icon={cart} />
              <IonBadge color="primary">{flagRefresh?Object.keys(shopingCart).length:Object.keys(shopingCart).length}</IonBadge>
            </IonFabButton>
          </IonFab>
          <IonSearchbar
            animated={true}
            value={searchText}
            onIonChange={(e) => {
              handleSearch(e);
            }}
            showCancelButton="always"
            hidden={!loaddata}
          ></IonSearchbar>

          {
            Object.keys(data).map((category: any, index) => {
              if (!data[category].length) {
                return (
                  <IonCard key={index}>
                    <IonText color="primary">Cargando</IonText>
                  </IonCard>
                );
              }
              let cards: Array<any> = [];
              return (<div key={index}>
                <IonTitle>{category}</IonTitle>
                {data[category].map((input: any, index: string | number | undefined) => {

                  if (!input.productName) {
                    return (
                      <IonCard key={index}>
                        <IonText color="primary">Cargando</IonText>
                      </IonCard>
                    );
                  }
                  const card = (
                    <IonCard key={index} class='cardSlide'>
                      <IonImg class='cardSlideImage' src={input.urlImage} />
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
                        class='cardSlideText'
                        onClick={() => {
                          if (currentUser) {
                            if (currentUser.roles.includes("ROLE_PROVIDER_ACCESS")) {
                              setShowModal(true);
                              setdataModal(input);
                            }
                          }
                        }}
                      >
                        <IonGrid>
                          <IonRow>
                            <IonCol >
                              <IonItem>
                                <IonText color={'dark'}>
                                  <h2>
                                    <strong>
                                      ${" "}
                                      {input ? (
                                        input.price
                                      ) : input.promotionPrice ? (
                                        <s>{input.price}</s>
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
                                          <strong>$ {input.promotionPrice}</strong>
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
                                currentUser.roles.includes("ROLE_PROVIDER_ACCESS")
                                  ? false
                                  : true
                              }
                            >
                              <IonItem>
                                <IonLabel>
                                  <h2> </h2>
                                  <h2>{`Total:    ${input.totalAmount}${input.measureType}`}</h2>
                                  <h3>{`Estado: ${
                                    input.enabled ? "Habilitado" : "Inhabilitado"
                                    }`}</h3>
                                  <p>{`Codigo de Producto:  ${input.code}`}</p>
                                </IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonGrid>

                      </IonCardContent>
                      <IonModal
                        backdropDismiss={false}
                        isOpen={showModal}
                        animated={true}
                      >
                        <UpdateProvider dataModal={dataModal}></UpdateProvider>
                        <IonFab vertical="bottom" horizontal="start" slot="fixed">
                          <IonFabButton
                            onClick={() => setShowModal(false)}
                            routerLink="/home"
                          >
                            <IonIcon icon={arrowBackOutline} />
                          </IonFabButton>
                        </IonFab>
                      </IonModal>
                      <IonItem
                        hidden={
                          currentUser.roles.includes("ROLE_USER_ACCESS")
                            ? false
                            : true
                        } class="cardSlideBtn  text-center"
                      >
                        {!shopingCart[`${input._id}`] ? (
                          <IonButton
                            fill="outline"
                            color="primary"
                            onClick={() => {
                              handleProductCart(input._id, "Add");
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
                                  shopingCart[`${input._id}`]
                                    ? shopingCart[`${input._id}`]
                                    : ""
                                  }`}</strong>
                              </IonText>
                              <IonButton
                                size="small"
                                fill="outline"
                                onClick={() => {
                                  if (
                                    input.totalAmount > shopingCart[`${input._id}`]&&shopingCart[`${input._id}`]
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

                      <IonSlides key={index}
                        options={slideOpts}
                        id="card"
                      >
                        {groups.map((group: any, index) => {
                          return <IonSlide key={index}>{group}</IonSlide>;
                        })}
                      </IonSlides>

                    );
                  }
                })}

              </div>)
            })}
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
