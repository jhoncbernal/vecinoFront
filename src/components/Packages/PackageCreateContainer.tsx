import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  businessOutline,
  homeOutline,
  cubeOutline,
  bicycleOutline,
  personCircleOutline,
  mailOpenOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import UploadComponent from "../../pages/interfaces/UploadComponent";
import { useDispatch } from "react-redux";
import { onAddPackage } from "../../redux/actions/packageActions";
import { checkEmptyFields, isAnyFieldEmpty } from "../../utils/objects";
import PackageTypePicker from "./MailTypeSelector";
import UtilitySelector from "./UtilitySelector";

const PacakgeCreateContainer: React.FC = () => {
  const [newPackage, setNewPackage] = useState({
    packageCode: "",
    deliveryCompany: "",
    receivedBy: "",
    imageUrl: "",
    sectionNumber: "",
    propertyNumber: "",
    kind: "package",
  });
  const [newNotification, setNewNotification] = useState({
    kind: "",
    receivedBy: "",
    utility: "",
  });
  const [isValid, setIsValid] = useState<any>({});
  const dispatch = useDispatch();

  const handleNewPackage = () => {
    const pkg = {
      ...newPackage,
    };
    const parmasValid = checkEmptyFields(pkg);
    const isValid = isAnyFieldEmpty(pkg);

    if (!isValid) {
      dispatch(onAddPackage(pkg));
      setNewPackage({
        packageCode: "",
        deliveryCompany: "",
        receivedBy: "",
        imageUrl: "",
        sectionNumber: "",
        propertyNumber: "",
        kind: "package",
      });
    }
    setIsValid(parmasValid);
  };
  const handleImageChange = async (image: any) => {
    if (image) {
      setNewPackage((prevPackageInfo) => ({
        ...prevPackageInfo,
        imageUrl: image,
      }));
    }
  };

  function handleNotifyAll(event: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <IonGrid>
        <IonRow>
          {newPackage.kind === "utilities" && (
            <UtilitySelector
              onSelection={(type) =>
                setNewNotification({
                  ...newNotification,
                  utility: type,
                })
              }
            />
          )}
          {newPackage.kind === "package" && (
            <IonCol size-md="2" size-xs="12" offset-md="5" offset-xs="0">
              <IonLabel>Paquete Recibido</IonLabel>
              <UploadComponent
                signUp={true}
                srcInitial={""}
                output={async (value: any) => {
                  handleImageChange(value.Location);
                }}
                showError={isValid?.imageUrl}
              ></UploadComponent>
            </IonCol>
          )}
        </IonRow>
        {newPackage.kind === "utilities" ? null : (
          <IonRow>
            <IonCol size-md="4" size-xs="12">
              <IonItem>
                <IonIcon color="primary" icon={businessOutline} slot="start" />
                <IonLabel position="floating">Torre</IonLabel>
                <IonInput
                  minlength={2}
                  maxlength={6}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="tel"
                  value={newPackage.sectionNumber}
                  onIonChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      sectionNumber: e.detail.value!,
                    })
                  }
                />
              </IonItem>
              <IonText color="blue" hidden={!isValid?.sectionNumber}>
                no puede estar vacio
              </IonText>
            </IonCol>
            <IonCol size-md="4" size-xs="12">
              <IonItem>
                <IonIcon color="primary" icon={homeOutline} slot="start" />
                <IonLabel position="floating">Apartamento</IonLabel>
                <IonInput
                  minlength={2}
                  maxlength={6}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="tel"
                  value={newPackage.propertyNumber}
                  onIonChange={(e) => {
                    setNewPackage({
                      ...newPackage,
                      propertyNumber: e.detail.value!,
                    });
                  }}
                />
              </IonItem>
              <IonText color="blue" hidden={!isValid?.propertyNumber}>
                no puede estar vacio
              </IonText>
            </IonCol>
            <IonCol size-md="4" size-xs="12">
              <IonItem>
                <IonIcon color="primary" icon={cubeOutline} slot="start" />
                <IonLabel position="floating">Codigo Paquete</IonLabel>
                <IonInput
                  minlength={4}
                  maxlength={16}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="tel"
                  value={newPackage.packageCode}
                  onIonChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      packageCode: e.detail.value!,
                    })
                  }
                />
              </IonItem>
              <IonText color="blue" hidden={!isValid?.packageCode}>
                no puede estar vacio
              </IonText>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
      <IonList>
        <IonRow>
          {newPackage.kind === "utilities" ? null : (
            <IonCol size-md="4" size-xs="12">
              <IonItem>
                <IonIcon color="primary" icon={bicycleOutline} slot="start" />
                <IonLabel position="floating">Transportadora</IonLabel>
                <IonInput
                  color="dark"
                  required={true}
                  autocomplete="on"
                  value={newPackage.deliveryCompany}
                  onIonChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      deliveryCompany: e.detail.value!,
                    })
                  }
                />
              </IonItem>
              <IonText color="blue" hidden={!isValid?.deliveryCompany}>
                no puede estar vacio
              </IonText>
            </IonCol>
          )}
          <IonCol size-md="4" size-xs="12">
            <IonItem>
              <IonIcon
                color="primary"
                icon={personCircleOutline}
                slot="start"
              />
              <IonLabel position="floating">Recibido por</IonLabel>
              <IonInput
                color="dark"
                required={true}
                autocomplete="on"
                value={newPackage.kind !== "utilities"?newPackage.receivedBy:newNotification.receivedBy}
                onIonChange={(e) => {
                  if (newPackage.kind !== "utilities") {
                    setNewPackage({
                      ...newPackage,
                      receivedBy: e.detail.value!,
                    });
                  } else {
                    setNewNotification({
                      ...newNotification,
                      receivedBy: e.detail.value!,
                    });
                  }
                }}
              />
            </IonItem>
            <IonText color="blue" hidden={!isValid?.receivedBy}>
              no puede estar vacio
            </IonText>
          </IonCol>
          <IonCol size-md="4" size-xs="12">
            <IonItem>
              <PackageTypePicker
                onSelectionChange={(type) =>
                  setNewPackage({
                    ...newPackage,
                    kind: type,
                  })
                }
              />
            </IonItem>
            <IonText color="blue" hidden={!isValid?.kind}>
              no puede estar vacio
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-md="4" size-xs="12" offset-md="4">
            {newPackage.kind === "utilities" ? (
              <IonButton
                size="large"
                color="secondary"
                expand="block"
                shape="round"
                onClick={handleNotifyAll}
              >
                Notificar a Todos
                <IonIcon slot="end" icon={mailOpenOutline} />
              </IonButton>
            ) : (
              <IonButton
                size="large"
                color="primary"
                expand="block"
                shape="round"
                onClick={handleNewPackage}
              >
                Crear
                <IonIcon slot="end" icon={cubeOutline} />
              </IonButton>
            )}
          </IonCol>
        </IonRow>
      </IonList>
    </>
  );
};
export default PacakgeCreateContainer;
