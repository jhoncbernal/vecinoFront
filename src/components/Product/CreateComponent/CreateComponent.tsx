import React, { FC, useState, FormEvent } from "react";
import UploadComponent from "../../../pages/interfaces/UploadComponent";
import style from "./style.module.css";
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonButton,
  IonTitle,
  IonIcon,
  IonToolbar,
  IonToast,
  IonDatetime,
} from "@ionic/react";
import config from "../../../config";
import { HttpRequest } from "../../../hooks/HttpRequest";
import { arrowBack } from "ionicons/icons";
import { Product } from "../../../entities";

const CreateComponent: FC<componentData> = ({ product, action }) => {
  const productType = [
    "Limpieza",
    "Comida",
    "Salud",
    "Carne",
    "Pollo",
    "Pescado",
  ];
  const measureType = ["Lb", "Kg", "Und"];
  const body: { [id: string]: any } = {};
  const [dataToast, setDataToast] = useState({ show: false, message: "" });

  const handleValueChange = (key: string, value: any) => {
    body[key] = value;
  };

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    const method = product._id ? "PATCH" : "POST";
    const pathUrl = product._id
      ? `${config.ProductContext}/${product._id}`
      : `${config.ProductContext}`;
    if (Object.keys(body).length === 0) {
      action({ hasChanges: false });
      return;
    }
    await HttpRequest(pathUrl, method, body, true)
      .then(async (response: any) => {
        action({ hasChanges: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <IonCard>
      <IonToolbar style={{ textAlign: "center" }}>
        <IonTitle>Carniceria</IonTitle>
        <IonButton
          slot="start"
          buttonType=""
          onClick={() => {
            const resp = { hasChanges: false };
            action(resp);
          }}
        >
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>
      </IonToolbar>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="4" offset="4">
              <UploadComponent
                srcInitial={product.urlImage}
                output={(value: any) => {
                  handleValueChange("urlImage", value.Location);
                  handleValueChange("keyImage", value.key);
                }}
              ></UploadComponent>
            </IonCol>
            <IonCol size="12" className={style["form-inputs"]}>
              <form
                onSubmit={(e) => {
                  submitData(e);
                }}
                action="post"
              >
                <label>Nombre del producto</label>
                <IonInput
                  required={true}
                  name="productName"
                  value={product.productName}
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Unidad de medida</label>
                <IonSelect
                  interface="popover"
                  name="measureType"
                  placeholder="Seleccione uno"
                  value={product.measureType}
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                >
                  {measureType.map((measure, index) => {
                    return (
                      <IonSelectOption key={index} value={measure}>
                        {measure}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
                <label>Precio</label>
                <IonInput
                  required={true}
                  name="price"
                  value={product.price}
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Tipo de producto</label>
                <IonSelect
                  value={product.productType}
                  interface="popover"
                  placeholder="Seleccione uno"
                  name="productType"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                >
                  {productType.map((type, index) => {
                    return (
                      <IonSelectOption key={index} value={type}>
                        {type}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
                <label>Unidades en stock</label>
                <IonInput
                  required={true}
                  value={product.totalAmount}
                  name="totalAmount"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Marca</label>
                <IonInput
                  required={true}
                  value={product.brand}
                  name="brand"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                 <label>Codigo de Producto</label>
                <IonInput
                  required={true}
                  value={product.code?product.code:new Date().getTime()}
                  name="code"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Precio en promoción </label>
                <IonInput
                  required={true}
                  value={product.promotionPrice}
                  name="promotionPrice"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Fecha de expiracion de la promoción</label>
                <IonDatetime
                  displayFormat="DD/MMM/YYYY"
                  name="promotionExpires"
                  placeholder="Seleccione la fecha de expiración"
                  monthShortNames="Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre"
                  value={product.promotionExpires?product.promotionExpires.toLocaleString():null}
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value!);
                  }}
                ></IonDatetime>
                <label>Descripción</label>
                <IonTextarea
                  required={true}
                  value={product.features}
                  name="features"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonTextarea>
                <IonCol>
                  <IonButton type="submit" expand="full" color="secondary">
                    Guardar
                  </IonButton>
                </IonCol>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          color="danger"
          isOpen={dataToast.show}
          onDidDismiss={() => {
            setDataToast({ show: false, message: "" });
          }}
          message={dataToast.message}
          duration={3000}
        />
      </IonCardContent>
    </IonCard>
  );
};
interface componentData {
  [id: string]: any;
  product: Product;
}

export default CreateComponent;
