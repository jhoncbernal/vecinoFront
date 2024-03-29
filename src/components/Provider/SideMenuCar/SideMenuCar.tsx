import React, { FC, useState, useCallback } from "react";
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
  IonAvatar,
  IonPopover,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonFabButton,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import style from "./style.module.css";
import { Product, Bill } from "../../../entities";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import { add, remove, informationCircleOutline } from "ionicons/icons";
import { deepCopy } from "../../../hooks/DeepCopy";
import { menuController } from "@ionic/core";
import {
  pushProviderBillsFirebase,
  pushStatesUserFirebase,
  deleteProviderBillsFirebase,
  deleteUserBillsFirebase,
} from "../../../config/firebase";

const SideMenuCar: FC<{ [id: string]: any }> = ({ dataSide }) => {
  const prevProducts: Product[] = deepCopy(dataSide.products);
  const states: Array<{ color: string; next: string }> = [
    { color: "gray", next: "prepare" },
    { color: "purple", next: "delivery" },
    { color: "blue-hole", next: "finished" },
    { color: "green-light", next: "" },
    { color: "red-light", next: "" },
  ];
  const [showPopOverOption, setPopOverOptions] = useState<{
    open: boolean;
    event: Event | undefined;
    item?: Product;
    indexItem?: number;
  }>({
    open: false,
    event: undefined,
  });

  const [showAlertDelete, setShowAlertDelete] = useState<{
    open: boolean;
    item?: Product;
  }>({
    open: false,
  });

  const [showAlertCancel, setShowAlertCancel] = useState<{
    open: boolean;
    item?: Product;
  }>({
    open: false,
  });

  const [showPopOverEdit, setShowPopOverEdit] = useState<{
    open: boolean;
    event: Event | undefined;
    item?: Product;
    indexItem?: number;
  }>({
    open: false,
    event: undefined,
  });

  const [showPopUpInfo, setPopUpInfo] = useState<boolean>(false);

  const [bodyChanges, setBodyChanges] = useState<any>({});
  const sumProducts = () => {
    let sum = 0;
    if (dataSide.products) {
      // eslint-disable-next-line array-callback-return
      dataSide.products.map((product: Product) => {
        sum += product.quantity! * product.price;
      });
    }
    return sum;
  };
  const sumFullBill = () => {
    let sum = 0;
    if (dataSide.products) {
      sum += sumProducts();
      sum += dataSide.deliveryCharge || 0;
      sum += dataSide.deliveryExtraCharge || 0;
      sum += dataSide.tip || 0;
    }
    return sum;
  };

  const deleteProductFromBill = (product: Product) => {
    const index = dataSide.products.indexOf(product);
    dataSide.products.splice(index, 1);
    setBodyChanges((prevState: any) => ({
      ...prevState,
      products: dataSide.products,
      subTotal: sumProducts(),
      Total: sumFullBill(),
    }));
  };

  const updateFirebase = (bill: Bill) => {
    pushProviderBillsFirebase({
      ...bill,
      Total: sumFullBill(),
      subTotal: sumProducts(),
    })
      .then(() => {
        menuController.close();
        setBodyChanges({});
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const updateStateFirebase = (states: any[]) => {
    pushProviderBillsFirebase({
      ...dataSide,
      states: states,
    })
      .then(() => {
        pushStatesUserFirebase(dataSide, states);
        menuController.close();
        setBodyChanges({});
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const saveChanges = useCallback(async () => {
    const pathUrl = `${config.BillsContext}/${dataSide._id}`;
    await HttpRequest(pathUrl, "PATCH", bodyChanges, true)
      .then(() => {
        updateFirebase(dataSide);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [bodyChanges, dataSide, updateFirebase]);

  const closeBill = useCallback(
    async (states: Array<{ state: string; start: string }>) => {
      setTimeout(async () => {
        const pathUrl = `${config.BillsContext}/${dataSide._id}`;
        await HttpRequest(
          pathUrl,
          "PATCH",
          { enabled: false, states: states },
          true
        )
          .then(() => {
            deleteProviderBillsFirebase(dataSide);
            deleteUserBillsFirebase(dataSide);
            menuController.close();
            setBodyChanges({});
          })
          .catch((error) => {
            console.error("error", error);
          });
      }, 10000);
    },
    [dataSide]
  );

  const nextState = useCallback(() => {
    let mStates: Array<{ state: string; start: string }> = [];
    if (dataSide.states) {
      if (dataSide.states) {
        const actualState = states[dataSide.states.length - 1];
        mStates = [
          ...dataSide.states,
          {
            state: actualState.next,
            start: new Date().toLocaleString("en-US", {
              timeZone: "America/Bogota",
            }),
          },
        ];
        updateStateFirebase(mStates);
        if (actualState.next === "finished") {
          closeBill(mStates);
        }
      }
    }
  }, [closeBill, dataSide.states, states, updateStateFirebase]);
  const cancelState = () => {
    let mStates: Array<{ state: string; start: string }> = [];
    if (dataSide.states) {
      if (dataSide.states.length === 1) {
        mStates.push({
          state: "start",
          start: new Date().toLocaleString("en-US", {
            timeZone: "America/Bogota",
          }),
        });
        mStates.push({
          start: new Date().toLocaleString("en-US", {
            timeZone: "America/Bogota",
          }),
          state: "cancel",
        });
      } else {
        mStates = [
          ...dataSide.states,
          {
            start: new Date().toLocaleString("en-US", {
              timeZone: "America/Bogota",
            }),
            state: "cancel",
          },
        ];
      }
    }
    updateStateFirebase(mStates);
    closeBill(mStates);
    //updateStateFirebase(mStates);
  };

  const renderList = (products: any) => {
    if (products) {
      return products.map((product: any, index: number) => {
        return (
          <IonItem
            key={index}
            onClick={(e) => {
              setPopOverOptions({
                open: true,
                event: e.nativeEvent,
                item: product,
                indexItem: index,
              });
            }}
          >
            <IonAvatar slot="end">
              <img src={product.urlImage} alt="" />
            </IonAvatar>
            <IonText>
              <h4>{product.productName}</h4>
              <p>
                Cantidad
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

  const renderAlert = () => {
    return (
      <IonAlert
        isOpen={showAlertDelete.open}
        onDidDismiss={() => {
          setShowAlertDelete({ open: false });
        }}
        header="Eliminar"
        subHeader={`Se eliminara el producto "${
          showAlertDelete.item ? showAlertDelete.item.productName : ""
        }"`}
        message="Esta seguro que desea retirar el producto de la compra"
        buttons={[
          "Cancelar",
          {
            text: "Eliminar",
            role: "cancel",
            cssClass: "danger",
            handler: () => {
              deleteProductFromBill(showAlertDelete.item!);
            },
          },
        ]}
      ></IonAlert>
    );
  };

  const renderAlertCancel = () => {
    return (
      <IonAlert
        isOpen={showAlertCancel.open}
        onDidDismiss={() => {
          setShowAlertCancel({ open: false });
        }}
        header="Cancelar"
        subHeader={`Se cancelara el pedido "${
          showAlertCancel.item ? showAlertCancel.item.productName : ""
        }"`}
        message="Esta seguro de cancelar el pedido, se le notificara al usuario"
        buttons={[
          "No",
          {
            text: "Si",
            role: "cancel",
            cssClass: "danger",
            handler: () => {
              cancelState();
            },
          },
        ]}
      ></IonAlert>
    );
  };

  const renderPopUpOptions = () => {
    return (
      <IonPopover
        isOpen={showPopOverOption.open}
        event={showPopOverOption.event}
        onDidDismiss={() =>
          setPopOverOptions({ open: false, event: undefined })
        }
      >
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size="12" style={{ textAlign: "center" }}>
                <span>¿Que desea hacer?</span>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  expand="block"
                  color="warning"
                  onClick={() => {
                    setPopOverOptions({ open: false, event: undefined });
                    setShowPopOverEdit({
                      open: true,
                      event: undefined,
                      item: deepCopy(showPopOverOption.item),
                      indexItem: showPopOverOption.indexItem,
                    });
                  }}
                >
                  Editar
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  expand="block"
                  color="danger"
                  disabled={dataSide.products && dataSide.products.length === 1}
                  onClick={() => {
                    setPopOverOptions({ open: false, event: undefined });
                    setShowAlertDelete({
                      open: true,
                      item: showPopOverOption.item,
                    });
                  }}
                >
                  Eliminar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPopover>
    );
  };

  const renderPopUpInfo = () => {
    return (
      <IonPopover
        isOpen={showPopUpInfo}
        onDidDismiss={() => {
          setPopUpInfo(false);
        }}
      >
        <IonHeader>
          <IonTitle>Resumen</IonTitle>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Productos:</IonLabel>
            <IonText>{sumProducts()}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel>Envio:</IonLabel>
            <IonText>${dataSide.deliveryCharge}</IonText>
          </IonItem>
          {dataSide.deliveryExtraCharge > 0 ? (
            <IonItem>
              <IonLabel>Envio-Extra:</IonLabel>
              <IonText>${dataSide.deliveryExtraCharge}</IonText>
            </IonItem>
          ) : null}
          {dataSide.tip > 0 ? (
            <IonItem>
              <IonLabel>Propina:</IonLabel>
              <IonText>${dataSide.tip}</IonText>
            </IonItem>
          ) : null}
        </IonList>
      </IonPopover>
    );
  };

  const getColorState = () => {
    let color = "gray";
    if (dataSide.states) {
      if (dataSide.states.length === 1) {
        return color;
      } else {
        if (dataSide.states) {
          color = states[dataSide.states.length - 1].color;
          return color;
        }
      }
    }
  };

  return (
    <>
      <IonMenu contentId="auxContent" side="end" swipeGesture={false}>
        <IonHeader>
          <IonToolbar color={getColorState()}>
            <IonTitle>Pedido No: {dataSide.code}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setPopUpInfo(true);
                }}
              >
                <IonIcon icon={informationCircleOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>{renderList(dataSide.products)}</IonList>
        </IonContent>
        <IonFooter>
          <IonHeader>
            <IonTitle>
              <IonLabel>Total:</IonLabel>
              <IonText className={style["price-label"]}>
                ${sumFullBill()}
              </IonText>
            </IonTitle>
          </IonHeader>
          {Object.keys(bodyChanges).length === 0 ? (
            <>
              <IonButton
                color="primary"
                expand="full"
                onClick={nextState}
                disabled={
                  dataSide.states &&
                  dataSide.states[dataSide.states.length - 1].state ===
                    "finished"
                }
              >
                Avanzar
              </IonButton>
              <IonButton
                color="danger"
                expand="full"
                disabled={
                  dataSide.states &&
                  dataSide.states[dataSide.states.length - 1].state ===
                    "finished"
                }
                onClick={() => {
                  setShowAlertCancel({ open: true });
                }}
              >
                Cancelar
              </IonButton>
            </>
          ) : (
            <IonButton onClick={saveChanges} color="warning" expand="full">
              Guardar
            </IonButton>
          )}
        </IonFooter>
        {renderPopUpInfo()}
        <IonPopover
          isOpen={showPopOverEdit.open}
          event={showPopOverEdit.event}
          onDidDismiss={() => {
            setShowPopOverEdit({ open: false, event: undefined });
          }}
        >
          <IonTitle style={{ textAlign: "center" }}>
            {showPopOverEdit.item ? showPopOverEdit.item.productName : ""}
          </IonTitle>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonFabButton
                    color="primary"
                    onClick={() => {
                      if (
                        showPopOverEdit.item &&
                        showPopOverEdit.item.quantity! > 1
                      ) {
                        showPopOverEdit.item.quantity! -= 1;
                        setShowPopOverEdit({
                          open: true,
                          event: undefined,
                          item: showPopOverEdit.item,
                          indexItem: showPopOverEdit.indexItem,
                        });
                      }
                    }}
                  >
                    <IonIcon icon={remove} />
                  </IonFabButton>
                </IonCol>
                <IonCol className={style["text-edit"]}>
                  {showPopOverEdit.item ? showPopOverEdit.item.quantity : ""}
                  <small style={{ fontSize: "20px" }}>
                    {showPopOverEdit.item
                      ? showPopOverEdit.item.measureType
                      : ""}
                  </small>
                </IonCol>
                <IonCol className={style["btn-flat"]}>
                  <IonFabButton
                    color="primary"
                    onClick={() => {
                      if (
                        showPopOverEdit.item &&
                        prevProducts[showPopOverEdit.indexItem!].quantity! >
                          showPopOverEdit.item.quantity!
                      ) {
                        showPopOverEdit.item.quantity! += 1;
                        setShowPopOverEdit({
                          open: true,
                          event: undefined,
                          item: showPopOverEdit.item,
                          indexItem: showPopOverEdit.indexItem,
                        });
                      }
                    }}
                  >
                    <IonIcon icon={add} />
                  </IonFabButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
          <IonFooter>
            <IonButton
              expand="full"
              onClick={() => {
                dataSide.products[showPopOverEdit.indexItem!] =
                  showPopOverEdit.item;
                setShowPopOverEdit({ open: false, event: undefined });
                setBodyChanges((prevState: any) => ({
                  ...prevState,
                  products: dataSide.products,
                  subTotal: sumProducts(),
                  Total: sumFullBill(),
                }));
              }}
            >
              Guardar cambio
            </IonButton>
          </IonFooter>
        </IonPopover>
        {renderPopUpOptions()}
        {renderAlert()}
        {renderAlertCancel()}
      </IonMenu>
    </>
  );
};

export default SideMenuCar;
