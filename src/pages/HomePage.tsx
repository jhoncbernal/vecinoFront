import React, { useState } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon,  IonModal,  IonFabList, IonAlert, IonBackdrop, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import './Tab1.css';
import Home from '../components/Home'
import { RouteComponentProps } from 'react-router';
import { menuSharp,  buildSharp,  carSportSharp,  logOutSharp, cardSharp, documentTextSharp, arrowBackOutline } from 'ionicons/icons';
import {Storages} from '../hooks/Storage'
import { FileFormPage } from '../components/FileForm';
import UpdateUser from '../components/UpdateUser';
const HomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dataModal, setdataModal] = useState(); 
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
              <IonFabButton onClick={() => setShowModal(true)} color='primary'><IonIcon icon={documentTextSharp} /></IonFabButton>
              <IonFabButton onClick={async() => { 
                const { getObject } = await Storages();
                const user: any = await getObject('token');
                if (!user) {
                  const err = new Error();
                  err.message = 'sus credenciales vencieron';
                  throw err;
                }
                setShowModal(true);
                setdataModal(user.obj.response.user);
                }}color='primary'><IonIcon icon={buildSharp} /></IonFabButton>
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

          <IonModal backdropDismiss={false} isOpen={showModal} animated={true}  >
          <IonContent>
          {!dataModal
        ?  <FileFormPage history={history}></FileFormPage>
        :  <UpdateUser dataModal={dataModal}></UpdateUser>
      }
         
            </IonContent>
            <IonFab vertical="bottom" horizontal="start"  slot="fixed">       
              <IonFabButton onClick={() => setShowModal(false)} routerLink="/home"><IonIcon icon={arrowBackOutline} /></IonFabButton>
            </IonFab>
          </IonModal>       
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
