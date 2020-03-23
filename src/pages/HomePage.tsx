import React, { useState } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon,  IonModal, IonButton, IonFabList, IonAlert } from '@ionic/react';
import './Tab1.css';
import Home from '../components/Home'
import { RouteComponentProps } from 'react-router';
import { menuSharp, personSharp, buildSharp,  carSportSharp,  logOutSharp, cardSharp } from 'ionicons/icons';
import {Storages} from '../hooks/Storage'
const HomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  return (
    <IonPage>
      <IonContent>
        <Home history={history} ></Home>
        <div>
          <IonFab horizontal="end" vertical="top" slot="fixed">
            <IonFabButton>
              <IonIcon icon={menuSharp} />
            </IonFabButton>
            <IonFabList side="bottom">
              <IonFabButton color='primary'><IonIcon icon={carSportSharp} /></IonFabButton>
              <IonFabButton onClick={() => setShowModal(true)} color='primary'><IonIcon icon={personSharp} /></IonFabButton>
              <IonFabButton color='primary'><IonIcon icon={buildSharp} /></IonFabButton>
              <IonFabButton color='primary'><IonIcon icon={cardSharp} /></IonFabButton>
              <IonFabButton color='dark'onClick={() => setShowAlert(true)} ><IonIcon color='primary' icon={logOutSharp} /></IonFabButton>
            </IonFabList>
          </IonFab>
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Cerrar sesión'}
          message={'¿Esta seguro?'}          
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Confirmar',
              handler:async () => {
                try{
                const {removeItem}=await Storages();
                 await removeItem('token');
                history.push(
                  '/tab1'
                )
              }catch(e){
                console.error('HomePage.handler: '+e)
              }
            }
            }
          ]}
        />
        </div>
          <IonModal isOpen={showModal} animated={true}  >
          <IonContent>
            </IonContent>
            <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
            
          </IonModal>
        
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
