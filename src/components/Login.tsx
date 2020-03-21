import React, { FormEvent } from 'react';
import { Storage } from '@capacitor/core';


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
  IonToggle
} from "@ionic/react";
import { personOutline, keyOutline, bulbOutline } from 'ionicons/icons';

export class LoginPage extends React.Component<{},
  {
    email: string
    password: string,
    checked: boolean,
    showToast1: boolean,
    loginMessage: string,
    hiddenbar: boolean,
  }> {

  constructor(props: any, private storage: Storage) {
    super(props);

    this.state = {
      email: '',
      password: '',
      checked: false,
      showToast1: false,
      loginMessage: '',
      hiddenbar: true,
    }
  }
  async setObject(obj: any) {
    await Storage.set({
      key: 'token',
      value: JSON.stringify({
        obj
      })
    });
  }
  async removeItem() {
    await Storage.remove({ key: 'token' });
  }
  async getObject() {
    const ret = await Storage.get({ key: 'token' });
    const user = JSON.parse(ret.value);
    console.log(user);
    return user;
  }
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {

      // const email,password
      //const user = await login(email, password);

      let url = 'http://localhost:4000/v1/api/auth/signin';
      let data = { email: this.state.email, password: this.state.password };
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
          if (response.token) {
            if (JSON.stringify(this.state.checked)) {
              this.setObject(response)
            }
            console.log('ok')
            this.setState({ 'loginMessage': 'login ok' })
            //  navigation.navigate('Home', {
            //    userInfo: response,
            //  });
          } else {
            this.setState({ 'loginMessage': response.message })
            console.error(response.message);            
          }
          this.setState({ 'showToast1': true })
        });

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
                <IonLabel position="floating">Username o Email</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' name='email' type="text" value={this.state.email} onInput={(email: any) => this.setState({'email': email.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={keyOutline} slot="start" />
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput color='dark' required={true} minlength={8} maxlength={18} name='password' type="password" value={this.state.password} onInput={(password: any) => this.setState({'password': password.target.value})} />
              </IonItem>
              
              <IonItem>
              <IonIcon color='primary' icon={bulbOutline} slot="start" />
              <IonLabel>Recordar usuario:</IonLabel>
            <IonToggle checked={this.state.checked} onIonChange={e => this.setState({ 'checked': e.detail.checked })} />
               </IonItem >               
               <IonProgressBar hidden={this.state.hiddenbar} type="indeterminate"></IonProgressBar><br />
               </IonCard>
              <IonButton class='btn-login' type="submit">Ingresar</IonButton>

              

            </form>

            
            <IonToast
              isOpen={this.state.showToast1}
              onDidDismiss={() => this.setState({ 'showToast1': false })}
              message={this.state.loginMessage}
              duration={2000}
            />

          <div id='btn-auth' >
          
            <IonButton class='btn-auth' routerLink="/tab3"  >¿Olvidaste tu usuario o contraseña?</IonButton>
            <IonButton class='btn-auth' routerLink="/tab2">Quiero registrarme</IonButton>
          </div>

        </IonContent>
      </>
    );
  }
}