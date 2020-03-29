import React, { useState } from 'react';
import { IonItem, IonIcon,  IonCard, IonCardContent, IonAvatar,IonSearchbar, IonText, IonModal, IonFab, IonFabButton, IonTitle, IonChip, IonLabel, IonCardTitle, IonThumbnail, IonItemDivider } from '@ionic/react';
import {  arrowBackOutline, carSportOutline, closeCircle, checkmarkCircle, bicycleOutline } from 'ionicons/icons';
import './ListContainer.css';
interface ContainerProps {
  inputs: Array<any>;
}

const ListContainer: React.FC<ContainerProps> = ({ inputs }) => {
  const dataModalIni: any = {};
  const [searchText, setSearchText] = useState('');
  const [data, setdata] = useState(inputs);
  const [dataModal, setdataModal] = useState(dataModalIni);
  const [showModal, setShowModal] = useState(false);
  try{
    if(inputs.length>0){
    return (
      <>

        <IonSearchbar value={searchText} onIonChange={(e) => {
          setdata(inputs);
          setSearchText(e.detail.value!);

          let newData = inputs.filter((item:any) => {
            const itemData = `${item.posnumber.toUpperCase()} ${item.available.toUpperCase()}`;
            const textData = searchText.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setdata(newData);
        }}
          showCancelButton="always"></IonSearchbar>

        {data.map((input: any, index:any) => {

          return (
            
              <IonCard onClick={() => { setShowModal(true); setdataModal(input) }} key={index}  color={input.available === 'false' ? 'danger' : 'primary'}>
               <IonCardTitle class='title'>P{input.posnumber}</IonCardTitle>

                <IonItemDivider>
                <IonAvatar color='primary'>
                    {input.vehicletype==='Motorcycle'
                      ?<IonIcon class='icon-avatar' size='large' src={'assets/icons/Motorcycle.svg'} />
                      :<></>
                    }
                    {input.vehicletype==='Car'
                      ?<IonIcon class='icon-avatar' size='large' src={carSportOutline} />
                      :<></>
                    }
                    {input.vehicletype==='Bike'
                      ?<IonIcon class='icon-avatar' size='large' src={bicycleOutline} />
                      :<></>
                    }
                  </IonAvatar>
                    
                      <IonItem><IonLabel>placa</IonLabel></IonItem>
                      <IonItem><IonLabel>tipo</IonLabel></IonItem>
                      <IonItem><IonLabel>color</IonLabel></IonItem>
                    
                <IonChip class='chip'>
                <IonLabel><h3>{input.available}</h3></IonLabel>
                  {input.available!=='false'
                ?<IonIcon color='primary' icon={checkmarkCircle} />
                :<IonIcon  color='danger' icon={closeCircle} />
                }
                </IonChip>
                </IonItemDivider>
             
              <IonModal backdropDismiss={false} isOpen={showModal} animated={true}  >
                {/* <UpdateUser dataModal={dataModal}></UpdateUser> */}
                <IonFab vertical="bottom" horizontal="start" slot="fixed">
                  <IonFabButton onClick={() => setShowModal(false)} routerLink="/home"><IonIcon icon={arrowBackOutline} /></IonFabButton>
                </IonFab>
              </IonModal>
              </IonCard>
          )
        })}
      </>
    );
  } else {
    return (<><h1><IonText color='primary'>Sin conexion</IonText></h1></>)
  }
}catch(e){
  console.error(e);
  throw e
}
};

export default ListContainer;
