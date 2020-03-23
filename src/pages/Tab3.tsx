import React from 'react';
import { IonContent,  IonPage } from '@ionic/react';
import { RecoverPage } from '../components/Recover';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
<RecoverPage></RecoverPage>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
