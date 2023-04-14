import React from "react";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { water, flash, wifi, flame, home, wallet } from "ionicons/icons";

interface BillOption {
  name: string;
  icon: string;
  color?: string;
}

const billOptions: BillOption[] = [
  {
    name: "Agua",
    icon: water,
    color: "primary",
  },
  {
    name: "Luz",
    icon: flash,
    color: "warning",
  },
  {
    name: "Internet",
    icon: wifi,
    color: "secondary",
  },
  {
    name: "Gas Natural",
    icon: flame,
    color: "danger",
  },
  {
    name: "Impuesto Predial",
    icon: home,
    color: "tertiary",
  },
  {
    name: "Other",
    icon: wallet,
    color: "success",
  },
];

interface UtilitySelectorProps {
  onSelection: (option: string) => void;
}

const UtilitySelector: React.FC<UtilitySelectorProps> = ({ onSelection }) => {
  return (
    <IonSegment>
      {billOptions.map((option) => (
        <IonSegmentButton
          value={option.name}
          key={option.name}
          onClick={() => onSelection(option.name)}
        >
          <div className={`status-icon ${option.color}`}>
            {option.name && <IonIcon className="icon" icon={option.icon} />}
          </div>
          <IonLabel>{option.name}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default UtilitySelector;
