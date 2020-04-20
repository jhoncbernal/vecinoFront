import React, { useState } from "react";
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
import { User, Provider, ShoppingOrder } from "../../../entities";

interface ContainerProps {
  currentUser: User;
  order: ShoppingOrder | undefined;
  provider: Provider;
}

const ResumeContainer: React.FC<ContainerProps> = ({
  currentUser,
  order,
  provider,
}) => {
  const today: Date = new Date();
  const [paymentMethod, setPaymentMethod] = useState<string>("efectivo");
  const [schedule, setSchedule] = useState<string>();
  const [cashValue, setCashValue] = useState<number>();
  const [address, setAddress] = useState<string>(
    currentUser.neighborhood.address
  );
  const [tip, setTip] = useState<string>("1000");
  const [flagExtraCharge, setFlagExtraCharge] = useState<boolean>(false);
  const [extraCharge, setextraCharge] = useState<number>(
    provider.deliveryCharge * 3
  );
  const [showAlert, setShowAlert] = useState(false);
  let total = 0;
  if (order) {
    total = Number(tip) + order.total + provider.deliveryCharge;
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
                setSchedule(e.detail.value);
                if (e.detail.value === "rightNow" && !flagExtraCharge) {
                  setShowAlert(true);
                } 
              }}
            >
              <IonSelectOption value="Mañana">
                {today.getHours() <= 8 ? "Hoy" : "Mañana"} de 9 am a 10 am
              </IonSelectOption>
              <IonSelectOption value="Tarde">
                {today.getHours() <= 12 ? "Hoy" : "Mañana"} de 1 pm a 2 pm{" "}
              </IonSelectOption>
              <IonSelectOption value="Noche">
                {today.getHours() <= 16 ? "Hoy" : "Mañana"} de 5 pm a 6 pm{" "}
              </IonSelectOption>
              <IonSelectOption value="rightNow">Ahora mismo</IonSelectOption>
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
            ${order ? order.total.toLocaleString() : null}
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
   <IonItemSliding >
            <IonItem>
              <IonLabel class=" ion-text-start">
                <IonText>Cargo Extra:</IonText>
              </IonLabel>
              <IonLabel class=" ion-text-end">
                ${extraCharge.toLocaleString()}
              </IonLabel>
              <IonItemOptions onIonSwipe={() => {setFlagExtraCharge(false);
              setAddress(currentUser.neighborhood.address);
              if(schedule==='rightNow'){
                setSchedule('');
              }}} >
              <IonItemOption slot={"end"} expandable={true} color={'danger'} >Eliminar<IonIcon src={trashBinOutline} slot="start" ></IonIcon></IonItemOption>
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
          <IonButton expand="full">Finalizar compra </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Cargo extra"}
        message={`Esta operacion tiene un cargo extra de ${extraCharge} ¿Desea continuar?`}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              try {
                setFlagExtraCharge(false);
              } catch (e) {
                console.error("ResumeContainer.handler: " + e);
              }
            },
          },
          {
            text: "Confirmar",
            handler: async () => {
              try {
                setextraCharge(3500);
                setFlagExtraCharge(true);
                if(schedule!=='rightNow'){
                  setSchedule('');
                }
              
              } catch (e) {
                console.error("ResumeContainer.handler: " + e);
              }
            },
          },
        ]}
      />
    </IonContent>
  );
};

export default ResumeContainer;
