import React from 'react';
import { IonContent,  IonPage  } from '@ionic/react';
import './Tab1.css';
import {LoginPage} from '../components/Login'
const Tab1: React.FC = () => {
  return (
    <IonPage>
        <IonContent>
        <LoginPage ></LoginPage>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
