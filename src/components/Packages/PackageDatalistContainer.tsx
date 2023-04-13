import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonText,
} from "@ionic/react";
import {
  businessOutline,
  cubeOutline,
  homeOutline,
  peopleCircleOutline,
  searchOutline,
} from "ionicons/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { packageState } from "../../redux/reducers/packageReducers";
import {
  onGetPackagesByPIN,
  onGetPackagesByPackageCode,
} from "../../redux/actions/packageActions";

interface PackageData {
  packageCodes: string[];
  propertyInfo: {
    sectionNumber: number;
    propertyNumber: number;
  };
  adminUuid: string;
  users: {
    name: string;
    uuid: string;
  }[];
}

interface Props {
  data?: PackageData;
}

const PackageList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = React.useState<string>("");
  const [validPin, setValidPin] = React.useState<boolean>(false);

  const regexValidPIN = /^[a-zA-Z]{1}[0-9]{4}$/;
  const pkgsByPIN = useSelector(
    (state: packageState) => state.package.data.pkgByPIN,
  );
  const pkgsByPackageCode = useSelector(
    (state: packageState) => state.package.data.pkg,
  );

  const handleSearch = () => {
    //regex to validate if pin contains the value as a letter and followig by 4 numbers
    if (pin.length > 4 && regexValidPIN.test(pin)) {
      dispatch(onGetPackagesByPIN(pin));
    }
  };

  const handlePkgDetails = (packageCode: string) => {
    dispatch(onGetPackagesByPackageCode(packageCode));
  };

  return (
    <IonGrid>
      <IonItem>
        <IonIcon color="primary" icon={cubeOutline} slot="start" />
        <IonLabel>PIN:</IonLabel>
        <IonInput
          color={validPin ? "success" : "dark"}
          required={true}
          autocomplete="off"
          type="text"
          value={pin}
          name="plate"
          onIonChange={(e: any) => {
            setPin(e.target.value);
            setValidPin(regexValidPIN.test(e.target.value));
          }}
        />
        <IonButton size="default" color="secondary" onClick={handleSearch}>
          <IonIcon icon={searchOutline} />
        </IonButton>
      </IonItem>
      <IonRow class="ion-align-items-start">
        <IonCol size-md="4" size-xs="12">
          <IonList style={{ overflow: "visible" }}>
            {pkgsByPIN?.packageCodes.map((code, index) => (
              <IonItem
                key={index}
                onClick={(e: any) => {
                  handlePkgDetails(e.target.innerText);
                }}
              >
                <IonIcon color="primary" icon={cubeOutline} slot="start" />
                <IonLabel position="fixed">#Paquete: </IonLabel>
                <IonText>{code}</IonText>
              </IonItem>
            ))}
          </IonList>
        </IonCol>
        <IonCol size-md="4" size-xs="12">
          {pkgsByPIN?.users.map(({ name, uuid }) => (
            <IonItem key={uuid}>
              <IonIcon
                color="primary"
                icon={peopleCircleOutline}
                slot="start"
              />
              <IonLabel position="fixed">Nombre: </IonLabel>
              <IonText>{name}</IonText>
            </IonItem>
          ))}
        </IonCol>
        <IonCol size-md="4" size-xs="12" hidden={pkgsByPIN ? false : true}>
          <IonItem>
            <IonIcon color="primary" icon={homeOutline} slot="start" />
            <IonLabel position="fixed">Apartamento</IonLabel>
            <IonText>
              {pkgsByPIN?.propertyInfo.propertyNumber.toString()}
            </IonText>
          </IonItem>
          <IonItem>
            <IonIcon color="primary" icon={businessOutline} slot="start" />
            <IonLabel position="fixed">Torre</IonLabel>
            <IonText>
              {pkgsByPIN?.propertyInfo.sectionNumber.toString()}
            </IonText>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PackageList;
