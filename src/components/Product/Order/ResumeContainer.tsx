import React, { useState, useCallback } from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonIcon,
  IonButton,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonItemGroup,
  IonItemSliding,
  IonAlert,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { cashOutline, trashBinOutline } from "ionicons/icons";
import {
  User,
  Provider,
  ShoppingOrder,
  ShoppingProduct,
  Bill,
} from "../../../entities";
import config from "../../../config";
import { HttpRequest } from "../../../hooks/HttpRequest";
import {
  pushProviderFirebase
} from "../../../config/firebase";
import * as H from 'history';
interface ContainerProps {
  history: H.History;
  closeModal: any;
  currentUser: User;
  order: ShoppingOrder | undefined;
  provider: Provider;
  products: ShoppingProduct;
  clearCart:any;
}

const ResumeContainer: React.FC<ContainerProps> = ({
  history,
  closeModal,
  currentUser,
  order,
  provider,
  products,
  clearCart,
}) => {
  const today: Date = new Date();
  const numDayOfWeek: number = today.getDay();
  const daysOfWeek: Array<string> = [
    "NoAplica",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];
  const todayschedule: any = provider.schedule.filter((obj) =>
    obj.days.includes(daysOfWeek[numDayOfWeek])
  );
  let tomorrow: string = daysOfWeek[numDayOfWeek + 1];
  if (daysOfWeek[numDayOfWeek] === "domingo") {
    tomorrow = "lunes";
  }
  const openHour: number = new Date(todayschedule[0].open).getHours() + 5;
  const closeHour: number = new Date(todayschedule[0].close).getHours() + 5;
  const flagDeliveryRighNow: boolean =
    openHour <= today.getHours() && today.getHours() <= closeHour - 1;
  const [paymentMethod, setPaymentMethod] = useState<string>("efectivo");
  const [schedule, setSchedule] = useState<string>();
  const [cashValue, setCashValue] = useState<number>(0);
  const [address, setAddress] = useState<string>(
    currentUser.neighborhood.address
  );
  const [tip, setTip] = useState<string>("1000");
  const [flagExtraCharge, setFlagExtraCharge] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertHeader, setAlertHeader] = useState("");
  const [showAlert2, setShowAlert2] = useState(false);

  let total = 0;
  const deliverySchedule = useCallback(
    (value) => {
      setSchedule(value);
      if (value === "rightNow" && !flagExtraCharge) {
        setShowAlert(true);
      }
    },
    [flagExtraCharge]
  );
  const submitOrder = useCallback(
    async (order: ShoppingOrder) => {
      let newTotal = Number(tip) + order.total + provider.deliveryCharge;
      if (
        (!cashValue || cashValue < newTotal) &&
        paymentMethod === "efectivo"
      ) {
        setAlertHeader("Verificar");
        setAlertMessage(
          `Por favor agrege una cantidad superior de efectivo con el cual va a pagar `
        );
      } else if (!schedule) {
        setAlertHeader("Verificar");
        setAlertMessage(
          `Seleccione el horario en el cual el desea que el pedido sea enviado`
        );
      } else {
        let data = {
          DeliverySchedule: schedule,
          MethodOfPayment: paymentMethod,
          products: products,
          provider: provider._id,
          flagExtraCharge: flagExtraCharge,
          tip: Number(tip),
        };
        if (address !== currentUser.neighborhood.address) {
          data = { ...data, ...{ otherAddress: address } };
        }
        if (paymentMethod === "efectivo") {
          data = { ...data, ...{ cashValue: cashValue } };
        }
        let pathUrl = `${config.BillsContext}`;
        
        await HttpRequest(pathUrl, "POST", data, true)
          .then(async (response: Bill) => {
            if (currentUser._id && provider._id) {
              await pushProviderFirebase(response);
            }
            setAlertHeader("Confirmacion de Orden");
            setAlertMessage(
              `su orden fue creada con el numero de seguimiento ${response.code}`
            );
            clearCart()

          })
          .catch((error) => {
            console.error(error);
            throw error;
          });

          
      }
      setShowAlert2(true);
    },
    [address, cashValue, clearCart, currentUser._id, currentUser.neighborhood.address, flagExtraCharge, paymentMethod, products, provider._id, provider.deliveryCharge, schedule, tip]
  );

  if (order) {
    total = Number(tip) + order.total + provider.deliveryCharge;
  }
  if(flagExtraCharge){
    total=total+provider.deliveryExtraCharge; 
  }
  return (
    <IonContent>
      <div>
        <IonItem>
          <IonLabel>Direccion:</IonLabel>
          <IonInput
            disabled={!flagExtraCharge}
            type={"text"}
            value={address}
            onInput={(e: any) => setAddress(e.target.value)}
          ></IonInput>
          <IonButton
            hidden={flagExtraCharge}
            color={"secondary"}
            size="default"
            onClick={() => {
              if (!flagExtraCharge) {
                setShowAlert(true);
              }
            }}
          >
            cambiar
          </IonButton>
        </IonItem>

        <IonItemGroup>
          <IonItemSliding class="ion-margin-start ion-align-items-start">
            <IonLabel>Programar envio:</IonLabel>
          </IonItemSliding>
          <IonItemSliding class="ion-align-items-end">
            <IonSelect
              interface="popover"
              value={schedule}
              placeholder="En que horario desea su pedido"
              onIonChange={(e) => {
                e.preventDefault();
                deliverySchedule(e.detail.value);
              }}
            >
              <IonSelectOption>
                {today.getHours() <= openHour - 1
                  ? `Hoy de ${openHour}:00  a ${openHour + 1}:00 `
                  : `${tomorrow} de ${openHour}:00  a ${openHour + 1}:00 `}{" "}
              </IonSelectOption>
              <IonSelectOption>
                {today.getHours() <= openHour + 4
                  ? `Hoy de ${openHour + 4}:00  a ${openHour + 5}:00 `
                  : `${tomorrow} de ${openHour + 4}:00  a ${
                      openHour + 5
                    }:00 `}{" "}
              </IonSelectOption>
              <IonSelectOption>
                {today.getHours() <= closeHour - 1
                  ? `Hoy de ${closeHour - 1}:00  a ${closeHour}:00 `
                  : `${tomorrow} de ${closeHour - 1}:00  a ${closeHour}:00 `}
              </IonSelectOption>
              {flagDeliveryRighNow ? (
                <IonSelectOption value="rightNow">Ahora mismo</IonSelectOption>
              ) : null}
            </IonSelect>
          </IonItemSliding>
        </IonItemGroup>
        <IonItem>
          <IonLabel>Metodo de Pago</IonLabel>
          <IonSelect
            interface="popover"
            value={paymentMethod}
            placeholder="Select One"
            onIonChange={(e) => {
              paymentMethod !== "efectivo"?setCashValue(0):
              setPaymentMethod(e.detail.value);
            }}
          >
            <IonSelectOption value="efectivo">Efectivo</IonSelectOption>
            <IonSelectOption value="tarjeta">Tarjeta</IonSelectOption>
          </IonSelect>
        </IonItem>
        {paymentMethod === "efectivo" ? (
          <IonItem>
            <IonIcon color="primary" icon={cashOutline} slot="start" />
            <IonLabel position="floating">
              Efectivo con el cual va a pagar
            </IonLabel>
            <IonInput
              color="dark"
              required={true}
              autocomplete="on"
              type="number"
              value={cashValue}
              onInput={(e: any) => setCashValue(e.target.value)}
            />
          </IonItem>
        ) : null}
        <IonItem>
          <IonText>
            <IonLabel>Propina:</IonLabel>
          </IonText>
          <IonSegment
            onIonChange={(e: any) => setTip(e.detail.value)}
            value={tip}
          >
            <IonSegmentButton value="0">
              <IonLabel>$0</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="1000">
              <IonLabel>$1,000</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="2000">
              <IonLabel>$2,000</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-align-items-start">Productos:</IonLabel>
          <IonLabel class="ion-align-items-end ion-text-end">
            ${order ? (order.total + order.salvings).toLocaleString() : null}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-align-items-start">Envió:</IonLabel>
          <IonLabel class="ion-align-items-end ion-text-end">
            ${provider.deliveryCharge.toLocaleString()}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-align-items-start">Propina:</IonLabel>
          <IonLabel class="ion-align-items-end ion-text-end">
            {" "}
            ${Number(tip).toLocaleString()}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class=" ion-text-start">
            <IonText>Descuento:</IonText>
          </IonLabel>
          <IonLabel class=" ion-text-end">
            ${order ? order.salvings.toLocaleString() : null}
          </IonLabel>
        </IonItem>
        {flagExtraCharge ? (
          <IonItemSliding>
            <IonItem>
              <IonLabel class=" ion-text-start">
                <IonText>Cargo Extra:</IonText>
              </IonLabel>
              <IonLabel class=" ion-text-end">
                ${provider.deliveryExtraCharge.toLocaleString()}
              </IonLabel>
              <IonItemOptions
                onIonSwipe={() => {
                  setFlagExtraCharge(false);
                  setAddress(currentUser.neighborhood.address);
                  if (schedule === "rightNow") {
                    setSchedule("");
                  }
                }}
              >
                <IonItemOption slot={"end"} expandable={true} color={"danger"}>
                  Eliminar<IonIcon src={trashBinOutline} slot="start"></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItem>
          </IonItemSliding>
        ) : null}
      </div>
      <IonFooter>
        <IonToolbar>
          <IonItem>
            <IonTitle class=" ion-text-start">Total:</IonTitle>
            <IonTitle class=" ion-text-end">${total.toLocaleString()}</IonTitle>
          </IonItem>
          <IonButton
           disabled={order?order.total>0?false:true:true}
            onClick={() => {
              if (order) {
                submitOrder(order);
              }
            }}
            expand="full"
          >
            Finalizar compra{" "}
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Cargo extra"}
        message={`Esta operacion tiene un cargo extra de ${provider.deliveryExtraCharge} ¿Desea continuar?`}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              try {
                setFlagExtraCharge(false);
                if (schedule === "rightNow") {
                  setSchedule("");
                }
              } catch (e) {
                console.error("ResumeContainer.handler: " + e);
              }
            },
          },
          {
            text: "Confirmar",
            handler: async () => {
              try {
                setFlagExtraCharge(true);
                if (schedule !== "rightNow") {
                  setSchedule("");
                }
              } catch (e) {
                console.error("ResumeContainer.handler: " + e);
              }
            },
          },
        ]}
      />
      <IonAlert
        isOpen={showAlert2}
        onDidDismiss={() => {
          if(alertMessage.includes("seguimiento")){
            closeModal(false);history.go(0);
          }
          setShowAlert2(false)
        }}
        header={alertHeader}
        message={alertMessage}
        buttons={alertMessage.includes("seguimiento")?
        ([{
          text: "Ok",
          handler: async () => {
            try {
              closeModal(false);
              setShowAlert2(false)
              history.go(0);
            } catch (e) {
              console.error("ResumeContainer.handler: " + e);
            }
          },
        }])
        :["OK"]}
      />
    </IonContent>
  );
};

export default ResumeContainer;
