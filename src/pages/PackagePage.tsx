import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { packageState } from "../redux/reducers/packageReducers";
import NotificationClient from "../components/Shared/NotificationClient";
import PacakgeCreateContainer from "../components/Packages/PackageCreateContainer";
import PackageDatalistContainer from "../components/Packages/PackageDatalistContainer";
import PackageList from "../components/Packages/PackageDatalistContainer";

const PackageManagerPage: React.FC = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const loadingNewPackage = useSelector(
    (state: packageState) => state.package.loading.newPackage,
  );
  const addPackage = useSelector(
    (state: packageState) => state.package.data.newPackage,
  );
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Package Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={loadingNewPackage} message={"Please wait..."} />

        <PacakgeCreateContainer />
        <PackageList
        
        />
        <NotificationClient
          isSuccess={notification.show}
          message={notification.message}
        />
      </IonContent>
    </IonPage>
  );
};
export default PackageManagerPage;
