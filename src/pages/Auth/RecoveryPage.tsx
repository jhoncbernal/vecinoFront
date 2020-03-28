import React from 'react';
import { IonContent,  IonPage } from '@ionic/react';
import { RecoverContainer } from '../../components/Auth/RecoverContainer';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <RecoverContainer></RecoverContainer>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
