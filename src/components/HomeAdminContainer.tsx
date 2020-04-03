import React, { useCallback, useState, useEffect } from 'react';
import { IonContent, IonImg, IonCard, IonProgressBar, IonAlert, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonTitle } from '@ionic/react';
import { HttpRequest } from '../hooks/HttpRequest';
import ListContainer from './User/ListContainer';
import ParkingListContainer from './ParkingSpace/ListContainer';
import { Storages } from '../hooks/Storage';
import { carSportSharp, bicycleSharp, peopleSharp } from 'ionicons/icons';

import Pusher from 'pusher-js';

interface ContainerProps {
  history: any;
}
Pusher.logToConsole = true;
var pusher = new Pusher('37e1cd4cd2b7c28cfa9e', {
  cluster: 'us2',
  forceTLS: true
});
var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data: any) {
  console.log(JSON.stringify(data))
});
const HomeAdminPageContainer: React.FC<ContainerProps> = ({ history }) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setloadData] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState('');
  const [usersArray, setUsersArray] = useState<any>([{}]);
  const [vehiclesArray, setVehiclesArray] = useState<any>([{}]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [segmentValue, setSegmentValue] = useState<any>("user");
  const httpRequest = useCallback(
    async () => {
      try {
        let pathurl;
        if (segmentValue === 'user') {
          pathurl = `/user`;
        } else {
          pathurl = `/parkingspace/${segmentValue}`;
        }
        await HttpRequest(pathurl, 'GET', '', true)
          .then(async (resultado: any) => {
            try {
              if (resultado.status) {
                setMessage('No se encontro ningun');
                setShowAlert1(true);
              }
            } catch (e) {
              console.error(e);
            }
            console.log(resultado);
            if (Array.isArray(resultado)) {
              setUsersArray(resultado);
            } else {
              setVehiclesArray(resultado.positions);
            }
            setHiddenBar(true);
            const { getObject } = await Storages();
            const user: any = await getObject('user');
            if (!user) {
              const err = new Error();
              err.message = 'sus credenciales vencieron';
              throw err;
            }
            else {
              setCurrentUser(user.obj)
            }
            setloadData(true);
          })
          .catch(error => {
            if (error.message.includes('404')) {
              setHiddenBar(true);
              setloadData(true);
            } else {
              throw error;
            }
          });
      } catch (e) {
        console.log(e.message)
        const { removeItem } = await Storages();
        await removeItem('token');
        await removeItem('user');
        setMessage(e.message);
        setShowAlert1(true);
        console.error("HomeAdminPageContainer: " + e);
        setHiddenBar(true);
        history.push(
          '/login'
        )
      }
    },
    [history, segmentValue],
  );

  useEffect(() => {
    setHiddenBar(false);
    setloadData(false);
    setUsersArray([{}]);
    setVehiclesArray([{}]);
    httpRequest();
  }, [httpRequest, segmentValue])
 
  return (
    <>
      <IonContent class="bg-image">
        <IonTitle> <IonImg class='img' src={'/assets/img/IconLogo.png'} /></IonTitle>
        {currentUser.firstName
          ? <IonTitle color='primary'>{`${currentUser.firstName}`}</IonTitle>
          : <></>}

        <IonCard class="card-login">
          <IonToolbar>
            <IonSegment onIonChange={(e) => {
              setSegmentValue(e.detail.value);
            }
            } color="secondary" value={segmentValue}>
              <IonSegmentButton value="user" >
                <IonIcon class='icons-segment' size='medium' icon={peopleSharp} />
              </IonSegmentButton>
              <IonSegmentButton value="Cars">
                <IonIcon class='icons-segment' size='medium' icon={carSportSharp} />
              </IonSegmentButton>
              <IonSegmentButton value="Motorcycles">
                <IonIcon class='icons-segment' size='medium' src={'assets/icons/motorcycleSharp.svg'} />
              </IonSegmentButton>
              <IonSegmentButton value="Bikes">
                <IonIcon class='icons-segment' size='medium' icon={bicycleSharp} />
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          {segmentValue
            ? <>{segmentValue === 'user' && hiddenBar
              ? <ListContainer loaddata={loadData} inputs={usersArray}></ListContainer>
              : <ParkingListContainer history={history} parkingType={segmentValue} loaddata={loadData} inputs={vehiclesArray}></ParkingListContainer>
            }</>
            : <></>}
          <IonProgressBar hidden={hiddenBar} type="indeterminate"></IonProgressBar><br />
        </IonCard>

        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(true)}
          header={'Advertencia'}
          subHeader={'se produjo un error debido a que:'}
          message={message}
          buttons={['OK']}
        />
      </IonContent>
    </>
  );
};

export default HomeAdminPageContainer;
