import React from "react";
import { IonIcon } from "@ionic/react";
import "./StatusIcon.css";
import { alertOutline, attachOutline, chatbubbleEllipsesOutline, checkmarkOutline, cubeOutline, mailOutline } from "ionicons/icons";

const StatusIcon = ({ status }: { status: string }) => {
  const getStatusClass = () => {
    switch (status) {
      case "received":
        return "primary";
      case "notified":
        return "warning";
      case "delivered":
        return "success";
      case "email":
        return "secondary";
      case "sms":
        return "tertiary";
      case "both":
        return "quaternary";
      default:
        return "dark";
    }
  };

  const getIconName = () => {
    switch (status) {
      case "received":
        return cubeOutline;
      case "email":
        return mailOutline;
      case "both":
        return attachOutline;
      case "notified":
        return alertOutline;
      case "delivered":
        return checkmarkOutline;
      case "sms":
        return chatbubbleEllipsesOutline;
      default:
        return "";
    }
  };

  return (
    <div className={`status-icon ${getStatusClass()}`}>
      {getIconName() && <IonIcon className="icon" icon={getIconName()} />}
      <span className="status-text">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
};

export default StatusIcon;
