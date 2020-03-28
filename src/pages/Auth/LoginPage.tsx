import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './LoginPage.css';
import { LoginPage } from '../../components/Auth/LoginContainer'
import { RouteComponentProps } from 'react-router';
const Tab1: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <IonPage>
      <IonContent>
        <LoginPage history={history} ></LoginPage>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
