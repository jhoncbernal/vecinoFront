import React, { useState } from 'react';
import { IonItem, IonIcon, IonLabel, IonCard, IonCardContent, IonAvatar, IonToggle, IonRow, IonGrid, IonCol, IonSearchbar, IonText, IonModal,  IonFab, IonFabButton,   IonTitle, IonCardHeader,  } from '@ionic/react';
import { arrowBackOutline, personOutline, warningOutline } from 'ionicons/icons';
import UpdateUser from './UpdateContainer';
interface ContainerProps {
  loaddata:boolean;
  inputs: Array<any>;
}

const ListContainer: React.FC<ContainerProps> = ({loaddata, inputs }) => {
  const dataModalIni:any={};
  const [searchText, setSearchText] = useState('');
  const [data, setdata] = useState(inputs);
  const [dataModal, setdataModal] = useState(dataModalIni);
  const [showModal, setShowModal] = useState(false);
  try{
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
         showCancelButton="always" hidden={!loaddata}></IonSearchbar>
         
      {data.map((input: any, index) => {

        return (

          <IonCard  key={index} id='card'  >
            <IonCardHeader color={input.debt > 0 ? 'danger' :'primary' }>
            <IonTitle ><strong>T{input.blockNumber} {input.homeNumber} {input.debt > 0 ? '  ¡Usuario en mora!' :'' }</strong></IonTitle>
            </IonCardHeader>
            <IonCardContent    onClick={() => {setShowModal(true);setdataModal(input)}}>
              <IonGrid >
              <IonItem><IonLabel >Habilidar o deshabilitar usuario:</IonLabel>
                      <IonToggle checked={input.enabled} onClick={() => setShowModal(true)} />
                    </IonItem>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonAvatar slot="start">
                        <IonIcon class='icon-avatar' size='large' color={input.debt > 0 ? 'danger' :'primary' } src={input.debt > 0 ? warningOutline :personOutline } />
                      </IonAvatar>
                      <IonLabel>
                                <h2>{input ? input.firstName : ''} {input ? input.lastName : ''}</h2>
                                <h3>{input ? input.email : ''}</h3>
                                <p>{input ? input.phone : ''}</p>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                    <IonLabel>
                                <h2>{`Points:    ${input.points}`}</h2>
                                <h3>{`Deuda: `} <strong>${input.debt}</strong></h3>
                                  <p>{`${input.isOwner ? 'Propietario' : 'No es propietario'}`}</p>
                      </IonLabel>
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
  }}catch(e){console.log(e);throw e}
};

export default ListContainer;
