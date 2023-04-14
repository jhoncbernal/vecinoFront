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
  IonListHeader,
  IonAvatar,
} from "@ionic/react";
import {
  alertCircleOutline,
  bookOutline,
  businessOutline,
  cubeOutline,
  homeOutline,
  peopleCircleOutline,
  searchOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { packageState } from "../../redux/reducers/packageReducers";
import {
  onGetPackagesByPIN,
  onGetPackagesByPackageCode,
  onResetPackage,
  onUpdatePackagesStatusByPIN,
} from "../../redux/actions/packageActions";
import DataNotFound from "../Shared/DataNotFound";
import { timeConvertTZ } from "../../utils/date";
import { hasFieldName } from "../../utils/objects";

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

type packageDetails = {
  [key: number]: {
    _id: string;
    packageCode: string;
    deliveryCompany: string;
    receivedBy: string;
    status: string;
    pin: string;
    users: {
      uuid: string;
    }[];
    admin: {
      uuid: string;
    }[];
    signature: string;
    imageUrl: string;
    notificationWay: string;
    uuid: string;
    receivedAt: string;
  };
};
type mouseOver = {
  [key: number]: boolean;
};
interface Props {
  data?: PackageData;
}

const PackageList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = React.useState<string>("");
  const [validPin, setValidPin] = React.useState<boolean>(false);
  const [packages, setPackages] = React.useState<packageDetails>();
  const [mouseOver, setMouseOver] = React.useState<mouseOver>();
  const [signedBy, setSignedBy] = React.useState<string | null>("");
  const [packageCode, setPackageCode] = React.useState<string>("");
  const [showError, setShowError] = React.useState<boolean>(false);
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
      setShowError(false);
      dispatch(onGetPackagesByPIN(pin));
    } else {
      setShowError(true);
    }
  };

  const handleReset = () => {
    setPin("");
    setValidPin(false);
    setPackages({});
    setPackageCode("");
    setSignedBy("");
    dispatch(onResetPackage("pkgByPIN"));
  };

  const handleUpdatePackageStatusByPIN = () => {
    if (signedBy) {
      dispatch(onUpdatePackagesStatusByPIN(pin, signedBy));
      setShowError(false);
    } else {
      setShowError(true);
    }
  };
  const handlePkgDetails = (packageCode: string) => {
    if (!hasFieldName(packageCode, packages)) {
      dispatch(onGetPackagesByPackageCode(packageCode));
    }
    setPackageCode(packageCode);
  };

  useEffect(() => {
    if (pkgsByPackageCode) {
      setPackages((prevPackageInfo: any) => ({
        ...prevPackageInfo,
        [packageCode]: pkgsByPackageCode,
      }));
    }
  }, [pkgsByPackageCode]);

  function handleDate(receivedAt: any) {
    return timeConvertTZ(receivedAt, "America/Bogota");
  }

  return (
    <IonGrid>
      <IonItem>
        <IonIcon color="primary" icon={cubeOutline} slot="start" />
        <IonLabel>PIN:</IonLabel>
        <IonInput
          color={validPin ? "success" : "dark"}
          required={true}
          maxlength={5}
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
      {pkgsByPIN ? (
        <IonRow class="ion-align-items-start">
          <IonCol size-md="3" size-xs="12">
            <IonList style={{ overflow: "visible" }}>
              {pkgsByPIN?.packageCodes?.map((code, index) => (
                <div key={index}>
                  {code === packageCode && packages ? (
                    <IonList size-md="4" size-xs="12">
                      <IonListHeader>
                        <IonLabel>Paquete # {code}</IonLabel>
                      </IonListHeader>
                      <IonItem>
                        <IonAvatar slot="start">
                          <img src={packages[code]?.imageUrl} />
                        </IonAvatar>
                        <IonLabel position="stacked">Estado: </IonLabel>
                        <IonText>{packages[code]?.status}</IonText>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Entregado por: </IonLabel>
                        <IonText>{packages[code]?.deliveryCompany}</IonText>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Recibido por: </IonLabel>
                        <IonText>{packages[code]?.receivedBy}</IonText>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">
                          Fecha de entrega:
                        </IonLabel>
                        <IonText>
                          {handleDate(packages[code]?.receivedAt)}
                        </IonText>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Notificación: </IonLabel>
                        <IonText>{packages[code]?.notificationWay}</IonText>
                      </IonItem>
                    </IonList>
                  ) : (
                    <IonItem
                      onClick={() => {
                        handlePkgDetails(code);
                      }}
                      onMouseEnter={() => setMouseOver({ [code]: true })}
                    >
                      <IonIcon
                        color="primary"
                        icon={cubeOutline}
                        slot="start"
                      />
                      <IonLabel position="fixed">#Paquete: </IonLabel>
                      <IonText>
                        {!hasFieldName(code, mouseOver) ? code : "Ver más"}
                      </IonText>
                    </IonItem>
                  )}
                </div>
              ))}
            </IonList>
          </IonCol>
          <IonCol size-md="3" size-xs="12">
            {pkgsByPIN?.users.map(({ name, uuid }) => (
              <IonItem key={uuid} onClick={() => setSignedBy(name)}>
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
          <IonCol size-md="3" size-xs="12" hidden={pkgsByPIN ? false : true}>
            <IonItem className={showError ? "has-error" : ""}>
              <IonIcon icon={bookOutline} slot="start"  color={showError ? "danger" : "primary"} />
              <IonLabel
               
                position="floating"
              >
                Entregado A:
              </IonLabel>
              <IonInput
                autocomplete="off"
                type="text"
                value={signedBy}
                onIonChange={(e) => setSignedBy(e.detail.value!)}
              />
              <IonIcon
                icon={alertCircleOutline}
                slot="end"
                color="danger"
                className={showError ? "" : "ion-hide"}
              />
            </IonItem>
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
          <IonCol size-md="2" size-xs="12" hidden={pkgsByPIN ? false : true}>
            <IonButton
              color="primary"
              size="default"
              expand="block"
              shape="round"
              onClick={handleUpdatePackageStatusByPIN}
            >
              <IonIcon icon={cubeOutline} />
              <IonText>Entregar</IonText>
            </IonButton>
            <IonButton
              color="danger"
              size="default"
              expand="block"
              shape="round"
              onClick={handleReset}
            >
              <IonIcon icon={cubeOutline} />
              <IonText>Cancelar</IonText>
            </IonButton>
          </IonCol>
        </IonRow>
      ) : (
        <DataNotFound hidden={pin.length === 5 && showError ? false : true} />
      )}
    </IonGrid>
  );
};

export default PackageList;
