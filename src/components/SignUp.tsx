import React, { FormEvent } from 'react';


import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonToast,
  IonProgressBar,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { mailOpenOutline, personOutline,  homeOutline,  bookOutline, keyOutline, cardOutline, phonePortraitOutline, arrowBackOutline } from 'ionicons/icons';

export class SignUpPage extends React.Component<{},
  {
    username:string,
    email: string
    password: string,
    confirmpassword: string,
    phone:number|string,
    firstName:string,
    lastName:string,
    blockNumber:number|string,
    homeNumber:number|string,
    documentId:number|string,
    neighborhoodcode:string,
    showToast1: boolean,
    loginMessage: string,
    hiddenbar: boolean,
  }> {

  constructor(props: any, private storage: Storage) {
    super(props);

    this.state = {
      username:'',
    email: '',
    password: '',
    confirmpassword:'',
    phone:'',
    firstName:'',
    lastName:'',
    blockNumber:'',
    homeNumber:'',
    documentId:'',
    neighborhoodcode:'',
      showToast1: false,
      loginMessage: '',
      hiddenbar: true,
    }
  }
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
if (this.state.password!==this.state.confirmpassword){
  this.setState({ 'loginMessage': 'la confirmacion de contraseña no coincide' })
  this.setState({ 'showToast1': true })
}else{
      // const email,password
      //const user = await login(email, password);

      let url = 'http://localhost:4000/v1/api/auth/signup';
      let data = { 
        roles: ['ROLE_USER_ACCESS'],
        username:this.state.username,
        email: this.state.email,
        password: this.state.password,
        phone:this.state.phone,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        blockNumber:this.state.blockNumber,
        homeNumber:this.state.homeNumber,
        documentId:this.state.documentId,
        neighborhoodcode:this.state.neighborhoodcode,
      };
      this.setState({ 'hiddenbar': false })
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          this.setState({ 'hiddenbar': true })
          if (response.emailResult) {
            console.log('ok')
            this.setState({ 'loginMessage':  'se envio un correo de verificacion de cuenta a ' +
            response.emailResult.email.result.accepted[0] })
            //  navigation.navigate('Home', {
            //    userInfo: response,
            //  });
          } else {
            this.setState({ 'loginMessage': response.message })
            console.error(response.message);
          }
          this.setState({ 'showToast1': true })
        });
      }
    } catch (e) {
      console.error(e);
    }
  }



  render() {

    return (
      <>
        <IonContent class="bg-image">
          <IonItem >
            <IonImg class='img' src={'https://drive.google.com/uc?export=view&id=1ZyIa6S4-qgL1FpdhzYrbC8EEYhe1G7P0'} />
          </IonItem>
         
            <form onSubmit={e => this.handleSubmit(e)} action="post">
            <IonCard class="card-login">
              <IonItem>
                <IonIcon color='primary' icon={personOutline} slot="start" />
                <IonLabel position="floating">Nombre de usuario</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' type="text" value={this.state.username} onInput={(e: any) => this.setState({'username': e.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={mailOpenOutline} slot="start" />
                <IonLabel position="floating">Email</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' type="email" value={this.state.email} onInput={(email: any) => this.setState({'email': email.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={phonePortraitOutline} slot="start" />
                <IonLabel position="floating">Telefono</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' type="number" value={this.state.phone} onInput={(phone: any) => this.setState({'phone': phone.target.value})} />
              </IonItem>
              <IonGrid>
              <IonLabel >Nombre completo</IonLabel> 
                <IonRow>        
                  <IonCol>
                    <IonItem>
                    <IonIcon color='primary' icon={personOutline} slot="start" />
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput color='dark' required={true} autocomplete='on' type="text" value={this.state.firstName} onInput={(e: any) => this.setState({'firstName': e.target.value})} />
                  </IonItem>
                  </IonCol> 
                  <IonCol> 
                    <IonItem>
                    <IonIcon color='primary' icon={personOutline} slot="start" />
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput color='dark' required={true} autocomplete='on' type="text" value={this.state.lastName} onInput={(e: any) => this.setState({'lastName': e.target.value})} />
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
                      <IonInput color='dark' required={true} autocomplete='on' type="number" value={this.state.blockNumber} onInput={(e: any) => this.setState({'blockNumber': e.target.value})} />
                    </IonItem>
                  </IonCol> 
                  <IonCol> 
                    <IonItem>
                      <IonIcon color='primary' icon={homeOutline} slot="start" />
                      <IonLabel position="floating">Apartamento</IonLabel>
                      <IonInput color='dark' required={true} autocomplete='on' type="number" value={this.state.homeNumber} onInput={(e: any) => this.setState({'homeNumber': e.target.value})} />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
                
              <IonItem>
                <IonIcon color='primary' icon={cardOutline} slot="start" />
                <IonLabel position="floating">Numero de identificación</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' type="number" value={this.state.documentId} onInput={(e: any) => this.setState({'documentId': e.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={bookOutline } slot="start" />
                <IonLabel position="floating">Codigo de conjunto</IonLabel>
                <IonInput color='dark' required={true} autocomplete="on" autocapitalize="on" type="text" value={this.state.neighborhoodcode} onInput={(e: any) => this.setState({'neighborhoodcode': e.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={keyOutline} slot="start" />
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput color='dark' required={true} minlength={8} maxlength={18} name='password' type="password" value={this.state.password} onInput={(password: any) => this.setState({'password': password.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={keyOutline} slot="start" />
                <IonLabel position="floating">Confirmar contraseña</IonLabel>
                <IonInput color='dark' required={true} minlength={8} maxlength={18} name='password' type="password" value={this.state.confirmpassword} onInput={(confirmpassword: any) => this.setState({'confirmpassword': confirmpassword.target.value})} />
              </IonItem>              
              <IonProgressBar hidden={this.state.hiddenbar} type="indeterminate"></IonProgressBar><br />
              </IonCard>
              <IonButton class='btn-login' type="submit">Registrarse</IonButton>

              
            </form>

           
            <IonToast
              isOpen={this.state.showToast1}
              onDidDismiss={() => this.setState({ 'showToast1': false })}
              message={this.state.loginMessage}
              duration={3000}
            />

         
          <IonFab vertical="bottom" horizontal="start"  slot="fixed">       
              <IonFabButton routerLink="/tab1"><IonIcon icon={arrowBackOutline} /></IonFabButton>
            </IonFab>
        </IonContent>
      </>
    );
  }
}