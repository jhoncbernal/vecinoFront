import React, { useCallback, useState } from 'react';
import { IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonInput, IonProgressBar, IonButton, IonAlert, IonSelect, IonSelectOption, } from '@ionic/react';
import { personOutline, pushOutline, listCircleOutline, colorPaletteOutline, buildOutline, searchOutline, logOutOutline } from 'ionicons/icons';
import { Storages } from '../../hooks/Storage';
import { HttpRequest } from '../../hooks/HttpRequest';

interface ContainerProps {
  dataModal: any;
}

const ChosePosition: React.FC<ContainerProps> = ({ dataModal }) => {
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
  <IonTitle><h1>Estacionamiento #{dataModall.posnumber}</h1></IonTitle>
    </IonToolbar>
    <IonContent>
      <form onSubmit={e => {handleSubmit(e)
      }} action="post">
        <IonCard class="card-login">
        <IonItem>
            <IonIcon color='primary' icon={personOutline} slot="start" />
            <IonLabel >Placa:</IonLabel>
            <IonInput color='dark' required={true} autocomplete='off' type="text" value={dataModall.vehicle ? dataModall.vehicle.plate : ''} />
            <IonButton size="default" color='secondary' ><IonIcon icon={searchOutline} /></IonButton>
          </IonItem>
          <IonItem>
                        <IonIcon color='primary' size='medium' icon={listCircleOutline} slot="start" />
                        <IonLabel position="floating">Parqueadero para:</IonLabel>
                        <IonSelect disabled  interface="popover" value={dataModall.vehicle ? dataModall.vehicle.vehicletype : ''} placeholder="Seleccione uno" >
                            <IonSelectOption value="Car" >Carro</IonSelectOption>
                            <IonSelectOption value="Motorcycle">Moto</IonSelectOption>
                            <IonSelectOption value="Bike">Bicicleta</IonSelectOption>
                        </IonSelect>
                    </IonItem>
          <IonItem>
            <IonIcon color='primary' icon={buildOutline} slot="start" />
            <IonLabel position="floating">Marca:</IonLabel>
            <IonInput color='dark' disabled required={true} autocomplete='off' type="text" value={dataModall.vehicle ? dataModall.vehicle.brand : ''} name='phone' onInput={(e:any)=>{handleValueChange(e.target.name,Number(e.target.value))}} />
          </IonItem>
         <IonItem>
            <IonIcon color='primary' icon={colorPaletteOutline} slot="start" />
            <IonLabel position="floating">Color:</IonLabel>
            <IonInput color='dark' disabled  required={true} autocomplete='off' type="text" value={dataModall.vehicle ? dataModall.vehicle.color : ''} name='documentId' onInput={(e:any)=>{ handleValueChange(e.target.name,Number(e.target.value))}}/>
          </IonItem>
          <IonProgressBar hidden={!showProgressBar} type="indeterminate"></IonProgressBar><br />
        </IonCard>
        {dataModall.available==='false'
        ?<IonButton color='primary' class='btn-login' type="submit"><IonIcon icon={pushOutline} slot="start" />LIBERAR</IonButton>
        :<IonButton color='danger' class='btn-login' type="submit"><IonIcon icon={logOutOutline} slot="start" />OCUPAR</IonButton>
        }
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

export default ChosePosition;
