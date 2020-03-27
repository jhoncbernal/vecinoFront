import React, { FormEvent } from 'react';
import { Storages } from '../hooks/Storage'

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
import { HttpRequest } from '../hooks/HttpRequest'
import { APIVERSION, BASEURL } from '../config';
export class LoginPage extends React.Component<{ history: any },
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
    this.preValues();
  }
  async preValues() {
    try {
      const { getObject } = Storages();
      let rememberme = await getObject('rememberme');
      this.setState({ 'email': rememberme.obj.username });
      this.setState({ 'checked': rememberme.obj.checked });
      let token = await getObject('token');
      if (token) {
        this.props.history.push(
          '/home'
        )
      }
    } catch (e) {
      console.error(e);
    }
  }
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const { setObject, removeItem } = Storages();
      let header = {
        'Content-Type': 'application/json',
      }
      let url = `${BASEURL}${APIVERSION}/auth/signin`
      let data = { email: this.state.email, password: this.state.password };
      this.setState({ 'hiddenbar': false })
      const { resultado } = await HttpRequest(url, 'POST', header, data);
      this.setState({ 'hiddenbar': true })
      if (!resultado.response.ErrorMessage) {
        await setObject('token', resultado);
        if (this.state.checked) {
          let rememberme = {
            'checked': this.state.checked,
            'username': this.state.email
          }
          await setObject('rememberme', rememberme);
        } else {
          await removeItem('checked');
          await removeItem('username');
        }
        this.setState({ 'loginMessage': 'Bienvenido!' });
        this.setState({ 'password': '' })

        this.props.history.push(
          '/home'
        );
      } else {
        this.setState({ 'loginMessage': resultado.response.ErrorMessage })
      }
      this.setState({ 'showToast1': true })


    } catch (e) {
      console.error("Login: " + e);
    }
  }



  render() {

    return (
      <>
        <IonContent class="bg-image">
          <IonItem >
            <IonImg class='img' src={'/assets/img/IconLogo.png'} />
          </IonItem>

          <form onSubmit={e => this.handleSubmit(e)} action="post">
            <IonCard class="card-login">
              <IonItem>
                <IonIcon color='primary' icon={personOutline} slot="start" />
                <IonLabel position="floating">Username o Email</IonLabel>
                <IonInput color='dark' required={true} autocomplete='on' name='email' type="text" value={this.state.email} onInput={(email: any) => this.setState({ 'email': email.target.value })} />
              </IonItem>
              <IonItem>
                <IonIcon color='primary' icon={keyOutline} slot="start" />
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput color='dark' required={true} minlength={8} maxlength={18} name='password' type="password" value={this.state.password} onInput={(password: any) => this.setState({ 'password': password.target.value })} />
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