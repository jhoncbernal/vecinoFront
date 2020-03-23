import React from 'react';
import './AuthContainer.css';
import {
    IonContent,
    IonItem,
    IonImg,
  } from "@ionic/react";
interface ContainerProps {
    body: any;
    buttons:any;
}

const AuthContainer: React.FC<ContainerProps> = ({ body,buttons }) => {
  return (
    <IonContent class="bg-image">
          <IonItem >
            <IonImg class='img' src={'https://drive.google.com/uc?export=view&id=1ZyIa6S4-qgL1FpdhzYrbC8EEYhe1G7P0'} />
          </IonItem>
          {body}
          {buttons}
        </IonContent>
  );
};

export default AuthContainer;
