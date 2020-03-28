import React from 'react';
import { IonContent,  IonPage} from '@ionic/react';
import { SignUpPage } from '../../components/Auth/SignUpContainer';

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
