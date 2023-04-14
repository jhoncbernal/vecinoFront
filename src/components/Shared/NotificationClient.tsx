import React, { useState, useEffect } from "react";
import { IonToast } from "@ionic/react";

interface NotificationProps {
  isSuccess: boolean;
  message: string;
}

const NotificationClient: React.FC<NotificationProps> = ({
  isSuccess,
  message,
}) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (message) {
      setShowToast(true);
    }
  }, [message]);

  const handleDismissToast = () => {
    setShowToast(false);
  };

  return (
    <IonToast
      isOpen={showToast}
      message={message}
      duration={10000}
      color={isSuccess ? "success" : "danger"}
      onDidDismiss={handleDismissToast}
    />
  );
};

export default NotificationClient;
