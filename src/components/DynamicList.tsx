import React, { useState } from 'react';
import { IonItem, IonIcon, IonLabel, IonCard, IonCardContent, IonAvatar, IonToggle, IonRow, IonGrid, IonCol, IonSearchbar, IonText, IonModal, IonContent, IonFab, IonFabButton, IonInput, IonToolbar, IonTitle, IonProgressBar, IonButton } from '@ionic/react';
import { personCircleOutline, arrowBackOutline, personOutline, mailOpenOutline, phonePortraitOutline, homeOutline, cardOutline, bulbOutline, pushOutline } from 'ionicons/icons';
import UpdateUser from './UpdateUser';
interface ContainerProps {
  inputs: Array<any>;
}

const DynamicList: React.FC<ContainerProps> = ({ inputs }) => {
  const dataModalIni:any={};
  const [searchText, setSearchText] = useState('');
  const [data, setdata] = useState(inputs);
  const [dataModal, setdataModal] = useState(dataModalIni);
  const [showModal, setShowModal] = useState(false);
  if(inputs.length>0){
  return (
    <>
    
      <IonSearchbar value={searchText} onIonChange={   (e)=>{
        setdata(inputs);
        setSearchText(e.detail.value!);

  let newData = inputs.filter(item =>{ 
    const itemData = `T${item.blockNumber.toString().toUpperCase()} ${item.homeNumber.toString().toUpperCase()} 
    ${item.firstName.toUpperCase()}${item.lastName.toUpperCase()}
    ${item.email.toUpperCase()}
    ${item.phone.toString().toUpperCase()}
    ${item.documentId.toString().toUpperCase()}`;
    const textData = searchText.toUpperCase();
    return itemData.indexOf(textData) > -1;  
  });
  setdata(newData);
}}


  
  

       // e => setSearchText(e.detail.value!)}
         showCancelButton="always"></IonSearchbar>
      {data.map((input: any, index) => {

        return (

          <IonCard  key={index} id='card'  >
            <IonCardContent    onClick={() => {setShowModal(true);setdataModal(input)}}>
              <IonGrid >
              <h1><IonTitle color='primary'>T{input.blockNumber} {input.homeNumber}</IonTitle></h1>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonAvatar slot="start">
                        <IonIcon class='icon-avatar' size='large' color={input.debt >= 0 ? 'danger' :'primary' } src={personCircleOutline} />
                      </IonAvatar>
                      <IonText>
                        <IonItem>{input.firstName}<br/> {input.lastName}</IonItem>
                        <IonItem>{input.email}</IonItem>
                        <IonItem>{input.phone}</IonItem>
                      </IonText>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem><IonLabel >Estado:</IonLabel>
                      <IonToggle checked={input.enabled} onClick={() => setShowModal(true)} />
                    </IonItem>
                    <IonItem>
                      <IonText>{`Points:    ${input.points}`}</IonText>
                    </IonItem>
                    <IonItem >
                    <IonText >{`Deuda: `}</IonText>
                    <IonText color={input.debt > 0 ? 'danger' :'dark' } ><strong>${input.debt}</strong></IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonItem hidden={true}>
                  <IonLabel>{input.documentId}</IonLabel>
                </IonItem>
                <IonItem hidden={true}>
                  <IonLabel>{input._id}</IonLabel>
                </IonItem>

              </IonGrid>
            </IonCardContent>
            <IonModal backdropDismiss={false} isOpen={showModal} animated={true}  >
            <UpdateUser dataModal={dataModal}></UpdateUser>
            <IonFab vertical="bottom" horizontal="start"  slot="fixed">       
              <IonFabButton onClick={() => setShowModal(false)} routerLink="/home"><IonIcon icon={arrowBackOutline} /></IonFabButton>
            </IonFab>
          </IonModal> 
          </IonCard>



        )
      })}


    </>

  );}else{
    return (<><h1><IonText color='primary'>Sin conexion</IonText></h1></>)
  }
};

export default DynamicList;
