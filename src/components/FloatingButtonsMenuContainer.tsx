import React, { useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonModal, IonFabList, IonAlert, IonText, IonCard, IonCardContent, } from '@ionic/react';
import { menuSharp, buildSharp, carSportSharp, logOutSharp, cardSharp, documentTextSharp, arrowBackOutline } from 'ionicons/icons';
import { Storages } from '../hooks/Storage'
import { FileFormPage } from './File/FileFormContainer';
import UpdateUser from './User/UpdateContainer';

import BestListContainer from './User/BestListContainer';
import { updateToken } from '../hooks/UpdateToken';
interface ContainerProps {
  history: any;
}
const FloatingButtonsMenu: React.FC<ContainerProps> = ({ history }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dataModal, setdataModal] = useState();
  const [fabButtonValue, setFabButtonValue] = useState('');


  return (
    <>
      <div>
        <IonFab horizontal="end" vertical="top" slot="fixed">
          <IonFabButton>
            <IonIcon icon={menuSharp} />
          </IonFabButton>
          <IonFabList side="bottom">
            <IonFabButton color='primary' onClick={() => {
              setFabButtonValue('bestPoints');
              setShowModal(true);
            }}><IonIcon icon={carSportSharp} /></IonFabButton>
            <IonFabButton onClick={() => { setFabButtonValue('document'); setShowModal(true) }} color='primary'><IonIcon icon={documentTextSharp} /></IonFabButton>
            <IonFabButton onClick={async () => {
              try {
                const { getObject } = await Storages();
                const user: any = await getObject('user');
                if (!user) {
                  const err = new Error();
                  err.message = 'sus credenciales vencieron';
                  throw err;
                }
                setFabButtonValue('config');
                setShowModal(true);
                setdataModal(user.obj);
              } catch (e) { console.error(e) }
            }} color='primary'><IonIcon icon={buildSharp} /></IonFabButton>
            <IonFabButton color='primary'><IonIcon icon={cardSharp} onClick={() => {
              setFabButtonValue('payment');
              setShowModal(true);
            }} /></IonFabButton>
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
              cssClass: 'secondary'
            },
            {
              text: 'Confirmar',
              handler: async () => {
                try {
                  updateToken('');
                  const { removeItem } = await Storages();
                  await removeItem('token');
                  await removeItem('user');
                  await removeItem('fireToken');
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

      <IonModal backdropDismiss={false} isOpen={showModal} animated={true}  >
        <IonContent>
          {fabButtonValue === 'document'
            ? (<FileFormPage history={history}></FileFormPage>)
            : fabButtonValue === 'config' ? (<UpdateUser dataModal={dataModal}></UpdateUser>)
              : fabButtonValue === 'bestPoints' ? (<BestListContainer dataModal={dataModal}></BestListContainer>)
                : <IonCard disabled  ><IonCardContent><IonText color='primary'><h1>En el futuro aca podra realizar sus pagos de administracion</h1><p>Esperelo muy pronto!</p></IonText></IonCardContent></IonCard>
          }

        </IonContent>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={async () => {
            setShowModal(false); setdataModal(false);
            history.goForward();
          }}><IonIcon icon={arrowBackOutline} /></IonFabButton>
        </IonFab>
      </IonModal>
    </>
  );
};

export default FloatingButtonsMenu;
