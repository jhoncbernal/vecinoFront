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
  IonItemSliding,
  IonAlert,
  IonItemOptions,
  IonItemOption,
  IonItemDivider,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  cashOutline,
  trashBinOutline,
  mapOutline,
  walletOutline,
} from "ionicons/icons";
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
  pushProviderBillsFirebase,
  pushStatesUserFirebase,
} from "../../../config/firebase";
import * as H from "history";
import { constants } from "../../../hooks/Constants";
interface ContainerProps {
  history: H.History;
  closeModal: any;
  currentUser: User;
  order: ShoppingOrder | undefined;
  provider: Provider;
  products: ShoppingProduct;
  clearCart: any;
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
  const daysOfWeek: Array<string> = constants.DAYS_OF_WEEK;
  const todayschedule: any = provider.schedule.filter((obj) =>
    obj.days.includes(daysOfWeek[numDayOfWeek])
  );
  let tomorrow: string = daysOfWeek[numDayOfWeek + 1];
  if (daysOfWeek[numDayOfWeek] === daysOfWeek[daysOfWeek.length - 1]) {
    tomorrow = daysOfWeek[0];
  }
  const tomorrowschedule: any = provider.schedule.filter((obj) =>
    obj.days.includes(
      daysOfWeek[tomorrow === daysOfWeek[0] ? 0 : numDayOfWeek + 1]
    )
  );
  let openHour = 0;
  let closeHour = 0;
  if (todayschedule.length > 0) {
    openHour = new Date(todayschedule[0].open).getHours() + 5;
    closeHour = new Date(todayschedule[0].close).getHours() + 5;
  }
  let openHourTomorrow = 0;
  let closeHourTomorrow = 0;
  if (tomorrowschedule.length > 0) {
    openHourTomorrow = new Date(tomorrowschedule[0].open).getHours() + 5;
    closeHourTomorrow = new Date(tomorrowschedule[0].close).getHours() + 5;
  }

  const flagDeliveryRighNow: boolean =
    openHour <= today.getHours() && today.getHours() <= closeHour - 2;
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [schedule, setSchedule] = useState<string>();
  const [cashValue, setCashValue] = useState<number>(0);
  const [address, setAddress] = useState<string>();
  const [tip, setTip] = useState<string>("0");
  const [flagExtraCharge, setFlagExtraCharge] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertHeader, setAlertHeader] = useState("");
  const [showAlert2, setShowAlert2] = useState(false);
  const [hiddenSpiner, setHiddenSpiner] = useState<boolean>(false);
  let total = 0;
  const deliverySchedule = useCallback(
    (value) => {
      setSchedule(value);
      if (value === "Ahora mismo" && !flagExtraCharge) {
        setShowAlert(true);
      }
    },
    [flagExtraCharge]
  );

  const submitOrder = useCallback(
    async (order: ShoppingOrder) => {
      setHiddenSpiner(true);
      const newTotal = Number(tip) + order.total + provider.deliveryCharge;
      if (
        (!cashValue || cashValue < newTotal) &&
        paymentMethod === "Cash"
      ) {
        setAlertHeader("Verificar");
        setAlertMessage(
          "Por favor agrege una cantidad superior de efectivo con el cual va a pagar "
        );
      } else if (!schedule) {
        setAlertHeader("Verificar");
        setAlertMessage(
          "Seleccione el horario en el cual el desea que el pedido sea enviado"
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
        if (
          address !== (currentUser.neighborhood.address || currentUser.address)
        ) {
          data = { ...data, ...{ otherAddress: address } };
        }
        if (paymentMethod === "Cash") {
          data = { ...data, ...{ cashValue: cashValue } };
        }
        const pathUrl = `${config.BillsContext}`;

        await HttpRequest(pathUrl, "POST", data, true)
          .then(async (response: Bill) => {
            if (currentUser._id && provider._id) {
              await pushProviderBillsFirebase(response);
              const mStates = [
                {
                  state: "start",
                  start: new Date().toLocaleString("en-US", {
                    timeZone: "America/Bogota",
                  }),
                },
              ];
              await pushStatesUserFirebase(response, mStates);
            }
            setAlertHeader("Confirmacion de Orden");
            setAlertMessage(
              `su orden fue creada con el numero de seguimiento ${response.code}`
            );
          })
          .catch((error) => {
            setHiddenSpiner(false);
            console.error(error);
            throw error;
          });
      }
      setHiddenSpiner(false);
      setShowAlert2(true);
    },
    [
      address,
      cashValue,
      currentUser._id,
      currentUser.address,
      currentUser.neighborhood.address,
      flagExtraCharge,
      paymentMethod,
      products,
      provider._id,
      provider.deliveryCharge,
      schedule,
      tip,
    ]
  );

  if (order) {
    total = Number(tip) + order.total + provider.deliveryCharge;
  }
  if (flagExtraCharge) {
    total = total + provider.deliveryExtraCharge;
  }
  return (
    <IonContent>
      <div>
        <IonToolbar color={"white"}>
          <IonTitle color={"primary"}>My order</IonTitle>
        </IonToolbar>

        <IonGrid>
          <IonRow>
            <IonCol size={"10"}>
              <IonItem lines="none">
                <IonLabel position="stacked">Address:</IonLabel>
                <IonIcon color="primary" icon={mapOutline} slot="start" />
                <IonInput
                  disabled={!flagExtraCharge}
                  type={"text"}
                  value={
                    address
                      ? address
                      : currentUser.neighborhood.address === "NO APPLY"
                      ? currentUser.address
                      : `${currentUser.neighborhood.address} T${currentUser?.propertyInfo?.sectionNumber}Apt${currentUser.propertyInfo.propertyNumber}`
                  }
                  onIonChange={(e: any) => setAddress(e.target.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol size={"2"}>
              <IonButton
                class="ion-float-right"
                size="default"
                hidden={flagExtraCharge}
                color={"secondary"}
                onClick={() => {
                  if (!flagExtraCharge) {
                    setShowAlert(true);
                  }
                }}
              >
                Change
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonItemDivider>
          <IonItem>
            <IonIcon
              color="primary"
              icon={"assets/icons/deliveryTimeOutline.svg"}
              slot="start"
            />
            <IonLabel position="stacked">Schedule delivery:</IonLabel>
            <IonSelect
              interface="popover"
              value={schedule}
              placeholder="At what time you want your order"
              onIonChange={(e) => {
                e.preventDefault();
                if (!e.detail.value.includes("Cerrado")) {
                  deliverySchedule(e.detail.value);
                } else {
                  deliverySchedule("");
                }
              }}
            >
              <IonSelectOption disabled={openHourTomorrow === 0}>
                {today.getHours() < openHour - 2
                  ? openHour !== 0
                    ? `Hoy de ${openHour}:00  a ${openHour + 1}:00 `
                    : "is close"
                  : openHourTomorrow !== 0
                  ? `${tomorrow} de ${openHourTomorrow}:00  a ${
                      openHourTomorrow + 1
                    }:00 `
                  : `The ${tomorrow} is close`}
              </IonSelectOption>
              <IonSelectOption disabled={openHourTomorrow === 0}>
                {today.getHours() < openHour + 4
                  ? openHour !== 0
                    ? `Hoy de ${openHour + 4}:00  a ${openHour + 5}:00 `
                    : "is close"
                  : openHourTomorrow !== 0
                  ? `${tomorrow} de ${openHourTomorrow + 4}:00  a ${
                      openHourTomorrow + 5
                    }:00 `
                  : `The ${tomorrow} is close`}
              </IonSelectOption>
              <IonSelectOption disabled={openHourTomorrow === 0}>
                {today.getHours() < closeHour - 2
                  ? openHour !== 0
                    ? `Hoy de ${closeHour - 1}:00  a ${closeHour}:00 `
                    : "Cerrado"
                  : openHourTomorrow !== 0
                  ? `${tomorrow} de ${
                      closeHourTomorrow - 1
                    }:00  a ${closeHourTomorrow}:00 `
                  : `The ${tomorrow} is close`}
              </IonSelectOption>
              {flagDeliveryRighNow ? (
                <IonSelectOption value="Right now">Right now</IonSelectOption>
              ) : null}
            </IonSelect>
          </IonItem>
        </IonItemDivider>
        <IonItemDivider>
          <IonItem>
            <IonIcon color="primary" src={walletOutline} slot="start" />
            <IonLabel position="stacked">Payment method</IonLabel>
            <IonSelect
              interface="popover"
              value={paymentMethod}
              placeholder="Select One"
              onIonChange={(e) => {
                if (paymentMethod !== "Cash") {
                  setCashValue(0);
                }
                setPaymentMethod(e.detail.value);
              }}
            >
              {provider.paymentMethod.map((kind: string, index: number) => {
                return (
                  <IonSelectOption key={index} value={kind}>
                    {kind.toUpperCase()}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        </IonItemDivider>
        {paymentMethod === "Cash" ? (
          <IonItemDivider>
            <IonItem>
              <IonIcon color="primary" icon={cashOutline} slot="start" />
              <IonLabel position="floating">Cash amount to pay</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="on"
                type="number"
                value={cashValue}
                onInput={(e: any) => setCashValue(e.target.value)}
              />
            </IonItem>
          </IonItemDivider>
        ) : null}
        <IonItem>
          <IonText>
            <IonLabel>Tip:</IonLabel>
          </IonText>
          <IonSegment
            onIonChange={(e: any) => setTip(e.detail.value)}
            value={tip}
          >
            {constants.TIPS.map((tip: string, index: number) => {
              return (
                  <IonSegmentButton key={index} value={tip}>
              <IonLabel>${tip}</IonLabel>
            </IonSegmentButton>);
            })}
          </IonSegment>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-align-items-start">Products:</IonLabel>
          <IonLabel class="ion-align-items-end ion-text-end">
            ${order ? (order.total + order.salvings).toLocaleString() : null}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-align-items-start">Delivery Fee:</IonLabel>
          <IonLabel class="ion-align-items-end ion-text-end">
            ${provider.deliveryCharge.toLocaleString()}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class="ion-align-items-start">Tip:</IonLabel>
          <IonLabel class="ion-align-items-end ion-text-end">
            ${Number(tip).toLocaleString()}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel class=" ion-text-start">
            <IonText>Discount:</IonText>
          </IonLabel>
          <IonLabel class=" ion-text-end">
            ${order ? order.salvings.toLocaleString() : null}
          </IonLabel>
        </IonItem>
        {flagExtraCharge ? (
          <IonItemSliding>
            <IonItem>
              <IonLabel class=" ion-text-start">
                <IonText>Extra Charge:</IonText>
              </IonLabel>
              <IonLabel class=" ion-text-end">
                ${provider.deliveryExtraCharge.toLocaleString()}
              </IonLabel>
              <IonItemOptions
                onIonSwipe={() => {
                  setFlagExtraCharge(false);
                  setAddress(
                    currentUser.neighborhood.address === "NO APPLY"
                      ? currentUser.address
                      : currentUser.neighborhood.address
                  );
                  if (schedule === "Right now") {
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
            disabled={
              order ? (order.total > 0 && !hiddenSpiner ? false : true) : true
            }
            onClick={() => {
              if (order) {
                submitOrder(order);
              }
            }}
            expand="full"
          >
            Finalize order
            <IonSpinner hidden={!hiddenSpiner} color={"white"} name="bubbles" />
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Extra charge "}
        message={`This operation has an extra charge of ${provider.deliveryExtraCharge} Are you sure to continue?`}
        buttons={[
          {
            text: "cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              try {
                setFlagExtraCharge(false);
                if (schedule === "Right now") {
                  setSchedule("");
                }
              } catch (e) {
                console.error("ResumeContainer.handler: " + e);
              }
            },
          },
          {
            text: "Accept",
            handler: async () => {
              try {
                setFlagExtraCharge(true);
                if (schedule !== "Right now") {
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
        onDidDismiss={async () => {
          if (alertMessage.includes("seguimiento")) {
            clearCart();
            closeModal(false);
            history.go(0);
          }
          setShowAlert2(false);
        }}
        header={alertHeader}
        message={alertMessage}
        buttons={
          alertMessage.includes("seguimiento")
            ? [
                {
                  text: "Ok",
                  handler: async () => {
                    try {
                      clearCart();
                      closeModal(false);
                      setShowAlert2(false);
                      history.go(0);
                    } catch (e) {
                      console.error("ResumeContainer.handler: " + e);
                    }
                  },
                },
              ]
            : ["OK"]
        }
      />
    </IonContent>
  );
};

export default ResumeContainer;
