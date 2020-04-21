import React, { FC, useState, useEffect } from "react";
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
  IonButtons
} from "@ionic/react";
import style from "./style.module.css";
import { Product } from "../../../entities";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import {
  add,
  remove,
  information,
  informationCircleOutline
} from "ionicons/icons";
import { deepCopy } from "../../../hooks/DeepCopy";
import { render } from "@testing-library/react";
import { menuController } from "@ionic/core";

const SideMenuCar: FC<{ [id: string]: any }> = ({ dataSide }) => {
  const prevProducts: Product[] = deepCopy(dataSide.products);
  const states: { [id: string]: any } = {
    start: "gray",
    prepare: "purple",
    delivery: "blue-hole",
    finished: "green-light",
    cancel: "red-light"
  };

  const [showPopOverOption, setPopOverOptions] = useState<{
    open: boolean;
    event: Event | undefined;
    item?: Product;
    indexItem?: number;
  }>({
    open: false,
    event: undefined
  });

  const [showAlertDelete, setShowAlertDelete] = useState<{
    open: boolean;
    item?: Product;
  }>({
    open: false
  });

  const [showPopOverEdit, setShowPopOverEdit] = useState<{
    open: boolean;
    event: Event | undefined;
    item?: Product;
    indexItem?: number;
  }>({
    open: false,
    event: undefined
  });

  const [showPopUpInfo, setPopUpInfo] = useState<boolean>(false);

  const [bodyChanges, setBodyChanges] = useState();

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

  const sumProducts = () => {
    let sum = 0;
    if (dataSide.products) {
      dataSide.products.map((product: Product) => {
        sum += product.quantity! * product.price;
      });
    }
    return sum;
  };
  const deleteProductFromBill = (product: Product) => {
    const index = dataSide.products.indexOf(product);
    dataSide.products.splice(index, 1);
    setBodyChanges({ ...bodyChanges, products: dataSide.products });
  };

  const saveChanges = () => {
    const pathUrl = `${config.BillsContext}/${dataSide._id}`;
    HttpRequest(pathUrl, "PATCH", bodyChanges, true)
      .then(response => {
        menuController.close();
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const renderList = (products: any) => {
    if (products) {
      return products.map((product: any, index: number) => {
        return (
          <IonItem
            key={index}
            onClick={e => {
              setPopOverOptions({
                open: true,
                event: e.nativeEvent,
                item: product,
                indexItem: index
              });
            }}
          >
            <IonAvatar slot="end">
              <img src={product.urlImage} alt="" />
            </IonAvatar>
            <IonText>
              <h4>{product.productName}</h4>
              <p>
                Cantidad{" "}
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
            handler: response => {
              deleteProductFromBill(showAlertDelete.item!);
            }
          }
        ]}
      ></IonAlert>
    );
  };

  const renderPopUpOptions = () => {
    return (
      <IonPopover
        isOpen={showPopOverOption.open}
        event={showPopOverOption.event}
        onDidDismiss={e => setPopOverOptions({ open: false, event: undefined })}
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
                      indexItem: showPopOverOption.indexItem
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
                  onClick={() => {
                    setPopOverOptions({ open: false, event: undefined });
                    setShowAlertDelete({
                      open: true,
                      item: showPopOverOption.item
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

  return (
    <>
      <IonMenu contentId="auxContent" side="end" swipeGesture={false}>
        <IonHeader>
          <IonToolbar color={states[dataSide.state]}>
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
          {!bodyChanges ? (
            <IonButton expand="full">Avanzar</IonButton>
          ) : (
            <IonButton onClick={saveChanges} color="warning" expand="full">
              Guardar
            </IonButton>
          )}
        </IonFooter>
        {renderPopUpInfo()}{" "}
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
                          indexItem: showPopOverEdit.indexItem
                        });
                      }
                    }}
                  >
                    <IonIcon icon={remove} />
                  </IonFabButton>
                </IonCol>
                <IonCol className={style["text-edit"]}>
                  {" "}
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
                          indexItem: showPopOverEdit.indexItem
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
                setBodyChanges({
                  ...bodyChanges,
                  products: dataSide.products,
                  Total: sumFullBill()
                });
              }}
            >
              Guardar cambio
            </IonButton>
          </IonFooter>
        </IonPopover>
        {renderPopUpOptions()}
        {renderAlert()}
      </IonMenu>
    </>
  );
};

export default SideMenuCar;
