import React, { FormEvent } from 'react';
import { Storage } from '@capacitor/core';


import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonIcon,
  IonCard,
  IonToast,
  IonProgressBar,
  IonImg
} from "@ionic/react";
import { person, lockClosed } from 'ionicons/icons';

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
            if (this.state.checked) {
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
          <IonCard class="card-login">
            <form onSubmit={e => this.handleSubmit(e)} action="post">

              <IonItem>
                <IonIcon color='dark' icon={person} slot="start" />
                <IonLabel position="floating">Username o Email</IonLabel>
                <IonInput color='light' required={true} autocomplete='on' name='email' type="email" value={this.state.email} onInput={(email: any) => this.setState({'email': email.target.value})} />
              </IonItem>
              <IonItem>
                <IonIcon color='dark' icon={lockClosed} slot="start" />
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput color='light' required={true} minlength={8} maxlength={18} name='password' type="password" value={this.state.password} onInput={(password: any) => this.setState({'password': password.target.value})} />
              </IonItem>
              <IonItem id='btn-rememberme' >
                <IonLabel>Recordar usuario</IonLabel>
                <IonCheckbox name='checked' checked={this.state.checked} onIonChange={e => this.setState({ 'checked': e.detail.checked })} />
              </IonItem >
              <IonButton class='btn-login' type="submit">Ingresar</IonButton>


            </form>

            <IonProgressBar hidden={this.state.hiddenbar} type="indeterminate"></IonProgressBar><br />
            <IonToast
              isOpen={this.state.showToast1}
              onDidDismiss={() => this.setState({ 'showToast1': false })}
              message={this.state.loginMessage}
              duration={2000}
            />

          </IonCard>
          <div id='btn-auth' >

            <IonButton >¿Olvidaste tu usuario o contraseña?</IonButton>
            <IonButton >Quiero registrarme</IonButton>
          </div>

        </IonContent>
      </>
    );
  }
}