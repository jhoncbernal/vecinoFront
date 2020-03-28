import React, { useCallback, useState } from 'react';
import { IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonInput, IonCol, IonRow, IonGrid, IonToggle, IonProgressBar, IonButton, } from '@ionic/react';
import { personOutline, phonePortraitOutline, mailOpenOutline, homeOutline, cardOutline, bulbOutline, pushOutline } from 'ionicons/icons';
import { HttpRequest } from '../../hooks/HttpRequest';

interface ContainerProps {
  dataModal: any;
}

const UpdateUser: React.FC<ContainerProps> = ({ dataModal }) => {
  let body:any={};
  const [showProgressBar, setShowProgressBar] = useState(false);
  const handleValueChange = useCallback(
    (property:string,value) => {
      try{
          body[property]=value;
      }catch(e){
        console.error(e);
      }
    },
    [body],
  );
  const handleSubmit = useCallback(
   async (e:any) => {
      try{
        e.preventDefault();
        let pathurl = `/user/${dataModal._id}`
        let data = body;
        setShowProgressBar(true);
        await HttpRequest(pathurl, 'PATH', data,true)
        .catch(error => console.error('Error:', error))
        .then((response: any) => {
          setShowProgressBar(false);
          console.log(response);
        });        
      }catch(e){
        console.error(e);
      }
    },
    [body],
  );
  return (<>
    <IonToolbar color='primary'>
      <IonTitle><h1>Actualizar datos</h1></IonTitle>
    </IonToolbar>
    <IonContent>
      <form onSubmit={e => {handleSubmit(e)
      }} action="post">
        <IonCard class="card-login">
          <IonItem>
            <IonIcon color='primary' icon={personOutline} slot="start" />
            <IonLabel position="floating">Nombre de usuario</IonLabel>
            <IonInput disabled color='dark' required={true} autocomplete='on' type="text" value={dataModal.username} />
          </IonItem>
          <IonItem>
            <IonIcon color='primary' icon={mailOpenOutline} slot="start" />
            <IonLabel position="floating">Email</IonLabel>
            <IonInput color='dark' required={true} autocomplete='on'  type="email" value={dataModal.email} name='email' onInput={(e:any)=>{ handleValueChange(e.target.name,e.target.value)}}/>
          </IonItem>
          <IonItem>
            <IonIcon color='primary' icon={phonePortraitOutline} slot="start" />
            <IonLabel position="floating">Telefono</IonLabel>
            <IonInput color='dark' required={true} autocomplete='on' type="number" value={dataModal.phone} name='phone' onInput={(e:any)=>{handleValueChange(e.target.name,Number(e.target.value))}} />
          </IonItem>
          <IonGrid>
            <IonLabel >Nombre completo</IonLabel>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={personOutline} slot="start" />
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput color='dark' required={true} autocomplete='on' type="text" value={dataModal.firstName} name='firstName' onInput={(e:any)=>{ handleValueChange(e.target.name,e.target.value)}}/>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={personOutline} slot="start" />
                  <IonLabel position="floating">Apellido</IonLabel>
                  <IonInput color='dark'  autocomplete='on' type="text" value={dataModal.lastName} name='lastName' onInput={(e:any)=>{ handleValueChange(e.target.name,e.target.value)}}/>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonLabel >Info de recidencia</IonLabel>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={homeOutline} slot="start" />
                  <IonLabel position="floating">Torre</IonLabel>
                  <IonInput color='dark'  autocomplete='on' type="number" value={dataModal.blockNumber} name='blockNumber' onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={homeOutline} slot="start" />
                  <IonLabel position="floating">Apartamento</IonLabel>
                  <IonInput color='dark'  autocomplete='on' type="number" value={dataModal.homeNumber} name='homeNumber'  onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonIcon color='primary' icon={cardOutline} slot="start" />
            <IonLabel position="floating">Numero de identificación</IonLabel>
            <IonInput color='dark' required={true} autocomplete='on' type="number" value={dataModal.documentId} name='documentId' onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
          </IonItem>
          <IonItem>
            <IonIcon color='primary' icon={bulbOutline} slot="start" />
            <IonLabel >Habilitar usuario</IonLabel>
            <IonToggle checked={dataModal.enabled} name='enabled' onIonChange={(e:any)=>{ handleValueChange(e.target.name,e.detail.checked)}}/>
          </IonItem>
          <IonProgressBar hidden={!showProgressBar} type="indeterminate"></IonProgressBar><br />
        </IonCard>
        <IonButton class='btn-login' type="submit"><IonIcon icon={pushOutline} slot="start" />Actualizar</IonButton>
      </form>
    </IonContent>
  </>
  );
};

export default UpdateUser;
