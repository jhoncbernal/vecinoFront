import React from 'react';
import { IonContent,  IonPage} from '@ionic/react';
import './Tab2.css';
import { SignUpPage } from '../components/SignUp';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <SignUpPage></SignUpPage>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
