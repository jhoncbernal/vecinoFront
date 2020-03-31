import React, { useState } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonModal, IonFabList, IonAlert, IonRefresher, IonRefresherContent, } from '@ionic/react';
import Home from '../components/HomeAdminContainer'
import { RouteComponentProps } from 'react-router';
import { menuSharp, buildSharp, carSportSharp, logOutSharp, cardSharp, documentTextSharp, arrowBackOutline } from 'ionicons/icons';
import { Storages } from '../hooks/Storage'
import { FileFormPage } from '../components/File/FileFormContainer';
import UpdateUser from '../components/User/UpdateContainer';
import { RefresherEventDetail } from '@ionic/core';
const HomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dataModal, setdataModal] = useState();
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
  
    setTimeout(() => {
      console.log('Async operation has ended');
      history.go(0);
      event.detail.complete();
    }, 2000);
  }
  
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
              <IonFabButton onClick={async () => {
                try {
                  const { getObject } = await Storages();
                  const user: any = await getObject('user');
                  if (!user) {
                    const err = new Error();
                    err.message = 'sus credenciales vencieron';
                    throw err;
                  }
                  setShowModal(true);
                  setdataModal(user.obj);
                } catch (e) { console.error(e) }
              }} color='primary'><IonIcon icon={buildSharp} /></IonFabButton>
              <IonFabButton color='primary'><IonIcon icon={cardSharp} /></IonFabButton>
              <IonFabButton color='dark' onClick={() => setShowAlert(true)} ><IonIcon color='primary' icon={logOutSharp} /></IonFabButton>
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
                handler: async () => {
                  try {
                    const { removeItem } = await Storages();
                    await removeItem('token');
                    await removeItem('user');
                    history.push(
                      '/login'
                    )
                  } catch (e) {
                    console.error('HomePage.handler: ' + e)
                  }
                }
              }
            ]}
          />
        </div>
        <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent color='primary'
          pullingIcon="arrow-dropdown"
          pullingText="Deslice para actualizar"
          refreshingSpinner="circles"
          refreshingText="Actualizando...">
        </IonRefresherContent>
      </IonRefresher>
    </IonContent>
        <IonModal backdropDismiss={false} isOpen={showModal} animated={true}  >
          <IonContent>
            {!dataModal
              ? <FileFormPage history={history}></FileFormPage>
              : <UpdateUser dataModal={dataModal}></UpdateUser>
            }

          </IonContent>
          <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton onClick={async() => { 
              setShowModal(false); setdataModal(false);
              history.goForward();    
             }}><IonIcon icon={arrowBackOutline} /></IonFabButton>
          </IonFab>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
