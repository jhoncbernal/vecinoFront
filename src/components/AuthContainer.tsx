import React from 'react';
import './AuthContainer.css';
import {
  IonContent,
  IonItem,
  IonImg,
} from "@ionic/react";
interface ContainerProps {
  body: any;
  buttons: any;
}

const AuthContainer: React.FC<ContainerProps> = ({ body, buttons }) => {
  return (
    <IonContent class="bg-image">
      <IonItem >
        <IonImg class='img' src={'/assets/img/IconLogo.png'} />
      </IonItem>
      {body}
      {buttons}
    </IonContent>
  );
};

export default AuthContainer;
