import React, { useCallback, useState } from 'react';
import { IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonInput, IonCol, IonRow, IonGrid, IonToggle, IonProgressBar, IonButton, IonAlert, } from '@ionic/react';
import { personOutline, phonePortraitOutline, mailOpenOutline, homeOutline, cardOutline, bulbOutline, pushOutline } from 'ionicons/icons';
import { HttpRequest } from '../../hooks/HttpRequest';
import { Storages } from '../../hooks/Storage';

interface ContainerProps {
  dataModal: any;
}

const UpdateUser: React.FC<ContainerProps> = ({ dataModal }) => {
  let body:any={};
  const [showAlert, setShowAlert] = useState(false);

  const [message, setMessage] = useState('');
  const [dataModall, setdataModall] = useState(dataModal);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [bodyChange, setbodyChange] = useState(false);
  const handleValueChange = useCallback(
    (property:string,value) => {
      try{
        setbodyChange(true);
          body[property]=value;
          console.log(body);
      }catch(e){
        console.error(e);
      }
    },
    [body],
  );
  const handleSubmit = useCallback(
   async (e:any) => {
      try{
        const { setObject } = Storages();   
        console.log(bodyChange);
        e.preventDefault();
        let pathurl = `/neighborhood/${dataModal._id}`
        if(dataModal.roles.includes('ROLE_USER_ACCESS')){
           pathurl = `/user/${dataModal._id}`
        }else{
           pathurl = `/neighborhood/${dataModal._id}`
        }
       
        let data = body;
        console.log(data);
        if(!bodyChange){         
          setMessage('No se modifico ningun campo');
        }
        else{
          setShowProgressBar(true);
          await HttpRequest(pathurl, 'PATCH', data,true)          
          .then(async(response:any)=>{
            setMessage('Actualizacion Exitosa');            
            setbodyChange(false);
            setdataModall(response);
            if(!dataModal.roles.includes('ROLE_USER_ACCESS')){
              await setObject('user',response);    
           }            
        })
        .catch(error =>{throw error});   
      }        
      setShowProgressBar(false);
      setShowAlert(true);
      }catch(e){
        setShowProgressBar(false);
        setShowAlert(true);
        setMessage(e);
        console.error(e);
      }
    },
    [body,dataModal,bodyChange],
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
            <IonInput disabled color='dark' required={true} autocomplete='off' type="text" value={dataModall.username} />
          </IonItem>
          <IonItem>
            <IonIcon color='primary' icon={mailOpenOutline} slot="start" />
            <IonLabel position="floating">Email</IonLabel>
            <IonInput color='dark' required={true} autocomplete='off'  type="email" value={dataModall.email} name='email' onInput={(e:any)=>{ handleValueChange(e.target.name,e.target.value)}}/>
          </IonItem>
          <IonItem>
            <IonIcon color='primary' icon={phonePortraitOutline} slot="start" />
            <IonLabel position="floating">Telefono</IonLabel>
            <IonInput color='dark' required={true} autocomplete='off' type="number" value={dataModall.phone} name='phone' onInput={(e:any)=>{handleValueChange(e.target.name,Number(e.target.value))}} />
          </IonItem>
          <IonGrid>
            <IonLabel >Nombre completo</IonLabel>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={personOutline} slot="start" />
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput color='dark' required={true} autocomplete='off' type="text" value={dataModall.firstName} name='firstName' onInput={(e:any)=>{ handleValueChange(e.target.name,e.target.value)}}/>
                </IonItem>
              </IonCol>
              <IonCol  hidden={dataModal.roles.includes('ROLE_USER_ACCESS')?false:true}> 
                <IonItem>
                  <IonIcon color='primary' icon={personOutline} slot="start" />
                  <IonLabel position="floating">Apellido</IonLabel>
                  <IonInput color='dark'  autocomplete='off' type="text" value={dataModall.lastName} name='lastName' onInput={(e:any)=>{ handleValueChange(e.target.name,e.target.value)}}/>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid  hidden={dataModal.roles.includes('ROLE_USER_ACCESS')?false:true}>
            <IonLabel >Info de recidencia</IonLabel>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={homeOutline} slot="start" />
                  <IonLabel position="floating">Torre</IonLabel>
                  <IonInput color='dark'  autocomplete='off' type="number" value={dataModall.blockNumber} name='blockNumber' onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonIcon color='primary' icon={homeOutline} slot="start" />
                  <IonLabel position="floating">Apartamento</IonLabel>
                  <IonInput color='dark'  autocomplete='off' type="number" value={dataModall.homeNumber} name='homeNumber'  onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonItem>
            <IonIcon color='primary' icon={cardOutline} slot="start" />
            <IonLabel position="floating">Numero de identificación</IonLabel>
            <IonInput color='dark' required={true} autocomplete='off' type="number" value={dataModall.documentId} name='documentId' onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
          </IonItem>
          <IonItem hidden={dataModal.roles.includes('ROLE_USER_ACCESS')?false:true}>
            <IonIcon color='primary' icon={bulbOutline} slot="start" />
            <IonLabel >Habilitar usuario</IonLabel>
            <IonToggle checked={dataModall.enabled} name="enabled" onIonChange={(e:any)=>{ handleValueChange(e.target.name.toString(),e.detail.checked)}}/>
          </IonItem>
          <IonProgressBar hidden={!showProgressBar} type="indeterminate"></IonProgressBar><br />
        </IonCard>
        <IonButton class='btn-login' type="submit"><IonIcon icon={pushOutline} slot="start" />Actualizar</IonButton>
      </form>
      <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Actualizacion'}
            subHeader={'respuesta:'}
            message={message}
            buttons={['OK']}
          />
    </IonContent>
  </>
  );
};

export default UpdateUser;
