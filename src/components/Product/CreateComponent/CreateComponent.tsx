import React, { FC, useState, FormEvent, useEffect } from "react";
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
import { Product, Provider } from "../../../entities";
import Axios from "axios";

const CreateComponent: FC<componentData> = ({ prod, action, provider }) => {
  const productType =
    provider && provider.categories ? provider.categories : ["Limpieza"];

  const measureType = ["Lb", "Kg", "Und"];
  let temp: { [id: string]: any } = {};
  const [dataToast, setDataToast] = useState({ show: false, message: "" });
  const [product, setProduct] = useState<{ [id: string]: any }>();
  const [flagImageUpload, setFlagImageUpload] = useState<boolean>(false);
  const handleValueChange = (key: string, value: any) => {
    temp[key] = value;
    setProduct((prevState: any) => ({
      ...prevState,
      ...temp,
    }));
  };

  useEffect(() => {
    if (prod && prod._id) {
      setProduct(prod);
    }
  }, [prod]);
  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    if (product) {
      let error: boolean = false;

      const method = product._id ? "PATCH" : "POST";
      const pathUrl = product._id
        ? `${config.ProductContext}/${product._id}`
        : `${config.ProductContext}`;
      if (Object.keys(product).length === 0) {
        action({ hasChanges: false });
        return;
      }
      if (method === "POST") {
        if (!product["code"]) {
          product["code"] = new Date().getTime();
        }
        if (!product["keyImage"]) {
          error = true;
          setDataToast({ show: true, message: "se debe agregar una imagen" });
        }
        if (product["price"] === 0) {
          error = true;
          setDataToast({
            show: true,
            message: "el precio debe ser superior a 0",
          });
        }

        if (product["totalAmount"] === 0) {
          error = true;
          return setDataToast({
            show: true,
            message: "las unidades en stock deben ser mayores a 0",
          });
        }
      }
      if (
        product["promotionPrice"] &&
        product.price &&
        product["promotionPrice"] > product.price
      ) {
        error = true;
        setDataToast({
          show: true,
          message: "el precio en promocion debe ser inferior al precio normal",
        });
      }
      if (!error) {
        await HttpRequest(pathUrl, method, product, true)
          .then(async (response: any) => {
            action({ hasChanges: true });
          })
          .catch((error) => {
            setDataToast({ show: true, message: error.message });
            console.error(error);
          });
      }
    }
  };

  return (
    <IonCard>
      <IonToolbar class="ion-text-center">
        <IonTitle>{provider.category.toUpperCase()}</IonTitle>
        <IonButton
          slot="start"
          buttonType=""
          onClick={async (e) => {
            if (flagImageUpload) {
              await submitData(e);
            }
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
                srcInitial={product ? product.urlImage : ""}
                output={async (value: any) => {
                  try {
                    setFlagImageUpload(false);
                    let header = {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods":
                        "GET, PUT, POST, DELETE, OPTIONS",
                    };
                    if (product) {
                      await Axios.delete(
                        `${config.BASE_URL}${config.API_VERSION}${config.FileDeleteImageContext}/${product.keyImage}`,
                        { headers: header }
                      );
                    }
                  } catch (error) {
                    setDataToast({ show: true, message: error.message });
                    console.error(error);
                  }
                  handleValueChange("urlImage", value.Location);
                  handleValueChange("keyImage", value.key);
                  setFlagImageUpload(true);
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
                  type="text"
                  required={true}
                  name="productName"
                  value={product?.productName}
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Unidad de medida</label>
                <IonSelect
                  interface="popover"
                  name="measureType"
                  placeholder="Seleccione uno"
                  value={product?.measureType}
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
                  type="number"
                  step="any"
                  required={true}
                  name="price"
                  value={product?.price}
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Tipo de producto</label>
                <IonSelect
                  value={product?.productType}
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
                  type="number"
                  required={true}
                  value={product?.totalAmount}
                  name="totalAmount"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Marca</label>
                <IonInput
                  type="text"
                  required={true}
                  value={product?.brand}
                  name="brand"
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Codigo de Producto</label>
                <IonInput
                  required={true}
                  value={product?.code ? product.code : new Date().getTime()}
                  name="code"
                  onIonBlur={(e: any) => {
                    handleValueChange(e.target.name, e.target.value);
                  }}
                ></IonInput>
                <label>Precio en promoción </label>
                <IonInput
                  type="number"
                  value={product?.promotionPrice}
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
                  value={
                    product?.promotionExpires
                      ? product.promotionExpires.toLocaleString()
                      : null
                  }
                  onIonChange={(e: any) => {
                    handleValueChange(e.target.name, e.target.value!);
                  }}
                ></IonDatetime>
                <label>Descripción</label>
                <IonTextarea
                  required={true}
                  value={product?.features}
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
  prod: Product;
  provider: Provider;
}

export default CreateComponent;
