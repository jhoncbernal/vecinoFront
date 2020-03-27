import React from 'react';
import { IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonInput, IonCol, IonRow, IonGrid, IonToggle, IonProgressBar, IonButton, } from '@ionic/react';
import { personOutline, phonePortraitOutline, mailOpenOutline, homeOutline, cardOutline, bulbOutline,  pushOutline } from 'ionicons/icons';

interface ContainerProps {
    dataModal: any;
}

const UpdateUser: React.FC<ContainerProps> = ({ dataModal }) => {
  return (<>
    <IonToolbar color='primary'>
    <IonTitle><h1>Actualizar datos</h1></IonTitle>
    </IonToolbar>
            
          <IonContent>

          <form onSubmit={e => {
          
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
                <IonInput color='dark' required={true} autocomplete='on' type="email" value={dataModal.email} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={phonePortraitOutline} slot="start" />
                <IonLabel position="floating">Telefono</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' type="number" value={dataModal.phone} />
              </IonItem>
              <IonGrid>
              <IonLabel >Nombre completo</IonLabel> 
                <IonRow>        
                  <IonCol>
                    <IonItem>
                    <IonIcon color='primary' icon={personOutline} slot="start" />
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput color='dark' required={true} autocomplete='on' type="text" value={dataModal.firstName} />
                  </IonItem>
                  </IonCol> 
                  <IonCol> 
                    <IonItem>
                    <IonIcon color='primary' icon={personOutline} slot="start" />
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput color='dark' required={true} autocomplete='on' type="text" value={dataModal.lastName} />
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
                      <IonInput color='dark' required={true} autocomplete='on' type="number" value={dataModal.blockNumber} />
                    </IonItem>
                  </IonCol> 
                  <IonCol> 
                    <IonItem>
                      <IonIcon color='primary' icon={homeOutline} slot="start" />
                      <IonLabel position="floating">Apartamento</IonLabel>
                      <IonInput color='dark' required={true} autocomplete='on' type="number" value={dataModal.homeNumber} />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
                
              <IonItem>
                <IonIcon color='primary' icon={cardOutline} slot="start" />
                <IonLabel position="floating">Numero de identificación</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' type="number" value={dataModal.documentId} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={bulbOutline} slot="start" />
                <IonLabel >Habilitar usuario</IonLabel>
                <IonToggle checked={dataModal.enabled} />
              </IonItem>
              <IonProgressBar hidden={dataModal.hiddenbar} type="indeterminate"></IonProgressBar><br />
              
              </IonCard>
              
              <IonButton class='btn-login' type="submit"><IonIcon icon={pushOutline} slot="start" />Actualizar</IonButton>
              </form>
            </IonContent>
           
  </>
  
  );
};

export default UpdateUser;
