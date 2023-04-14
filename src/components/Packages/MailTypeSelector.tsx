import React, { useState } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

type Props = {
  onSelectionChange?: (selection: string) => void;
};

const PackageTypePicker: React.FC<Props> = ({ onSelectionChange }) => {
  const [selectedType, setSelectedType] = useState<string>("package");

  const handleTypeChange = (event: CustomEvent) => {
    const type = event.detail.value;
    setSelectedType(type);

    if (onSelectionChange) {
      onSelectionChange(type);
    }
  };

  return (
    <IonSegment onIonChange={handleTypeChange} value={selectedType}>
      <IonSegmentButton value="utilities">
        <IonLabel>Recibos</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="package">
        <IonLabel>Paquetes</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="mail">
        <IonLabel>Cartas</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default PackageTypePicker;
