import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonCard,
  IonSegmentButton,
  IonSegment,
  IonLabel,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { packageState } from "../redux/reducers/packageReducers";
import NotificationClient from "../components/Shared/NotificationClient";
import PacakgeCreateContainer from "../components/Packages/PackageCreateContainer";
import PackageList from "../components/Packages/PackageDatalistContainer";
import DynamicTable from "../components/Packages/PackageHistoryContainer";
import { onGetPackagesByAdmin } from "../redux/actions/packageActions";

const PackageManagerPage: React.FC = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [segmentValue, setSegmentValue] = useState<any>("create");
  const loadingNewPackage = useSelector(
    (state: packageState) => state.package.loading.newPackage,
  );
  const addPackage = useSelector(
    (state: packageState) => state.package.data.newPackage,
  );
    const packageList = useSelector(
      (state: packageState) => state.package.data.packageList,
    );
  const dispatch = useDispatch();
    const columnAliases = {
      imageUrl: "Imagen",
      pin: "PIN",
      packageCode: "Código de paquete",
      deliveryCompany: "Compañía de envío",
      receivedBy: "Recibido por",
      status: "Estado",
      notificationWay: "Notificación",
      sectionNumber: "Sección",
      propertyNumber: "Número de propiedad",
      receivedAt: "Fecha de recepción",
    };
  useEffect(() => {
    if (addPackage?.pin) {
      setNotification({
        show: true,
        message: `Paquete agregado correctamente con el PIN ${addPackage.pin}`,
      });
    } else if (addPackage !== null && !addPackage?.pin) {
      setNotification({
        show: false,
        message: "Error al agregar paquete",
      });
    }
  }, [addPackage]);

  const handleGetPackageList = () => {
    dispatch(onGetPackagesByAdmin("b46d6fdd-415f-420a-bfb8-547c56f37f3b"));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Package Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={loadingNewPackage} message={"Please wait..."} />
        <IonCard>
          <IonSegment
            onIonChange={(e) => {
              setSegmentValue(e.detail.value);
            }}
            value={segmentValue}
          >
            <IonSegmentButton value="create">
              <IonLabel>Crear</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="list">
              <IonLabel>Buscar</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="history" onClick={handleGetPackageList}>
              <IonLabel>Historial</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {segmentValue === "create" && <PacakgeCreateContainer />}
          {segmentValue === "list" && <PackageList />}
          {segmentValue === "history" && (
            <DynamicTable data={packageList} columnAliases={columnAliases} />
          )}
        </IonCard>
        <NotificationClient
          isSuccess={notification.show}
          message={notification.message}
        />
      </IonContent>
    </IonPage>
  );
};
export default PackageManagerPage;
