import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { businessOutline, homeOutline, cubeOutline, bicycleOutline, personCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import UploadComponent from "../../pages/interfaces/UploadComponent";
import { useDispatch } from "react-redux";
import { onAddPackage } from "../../redux/actions/packageActions";
import { checkEmptyFields, isAnyFieldEmpty } from "../../utils/objects";


const PacakgeCreateContainer: React.FC = () => {

    const [newPackage, setNewPackage] = useState({
      packageCode: "",
      deliveryCompany: "",
      receivedBy: "",
      imageUrl: "",
      sectionNumber: "",
      propertyNumber: "",
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


    return (
      <IonCard class="package-card-center">
        <IonGrid>
          <IonRow>
            <IonCol size-md="2" size-xs="12" offset-md="5" offset-xs="0">
              <IonLabel>Paquete Recibido</IonLabel>
              <UploadComponent
                signUp={true}
                srcInitial={""}
                output={async (value: any) => {
                  console.log("value", value);
                  handleImageChange(value.Location);
                }}
              ></UploadComponent>
            </IonCol>
          </IonRow>
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
        </IonGrid>

        <IonList>
          <IonRow>
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
                  value={newPackage.receivedBy}
                  onIonChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      receivedBy: e.detail.value!,
                    })
                  }
                />{" "}
              </IonItem>
              <IonText color="blue" hidden={!isValid?.receivedBy}>
                no puede estar vacio
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-md="4" size-xs="12" offset-md="4">
              <IonButton
                size="large"
                expand="block"
                shape="round"
                onClick={handleNewPackage}
              >
                Crear
                <IonIcon slot="end" icon={cubeOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonList>
      </IonCard>
    );
};
export default PacakgeCreateContainer;
