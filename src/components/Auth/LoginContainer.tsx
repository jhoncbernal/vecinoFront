import React, { FormEvent } from "react";
import { Storages } from "../../hooks/Storage";

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
  IonToggle,
} from "@ionic/react";
import { personOutline, keyOutline, bulbOutline } from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import  {updateToken}  from "../../hooks/UpdateToken";
import config from "../../config";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";

const { PushNotifications } = Plugins;
const notifications = [
  { id: "id", title: "Test Push", body: "This is my first push notification" },
];
export class LoginPage extends React.Component<
  { history: any },
  {
    email: string;
    password: string;
    checked: boolean;
    showToast1: boolean;
    loginMessage: string;
    hiddenbar: boolean;
    notification: { id: string; title: string; body: string }[];
  }
> {
  constructor(props: any, private storage: Storage) {
    super(props);

    this.state = {
      email: "",
      password: "",
      checked: false,
      showToast1: false,
      loginMessage: "",
      hiddenbar: true,
      notification: notifications,
    };
    this.preValues();
  }
  async preValues() {
    try {
      const { getObject } = Storages();
      let rememberme = await getObject("rememberme");
      this.setState({ email: rememberme.obj.username });
      this.setState({ checked: rememberme.obj.checked });
      let user = await getObject("user");
      if (user) {
        this.props.history.push("/home");
      }
    } catch (e) {
      console.error(e);
    }
  }
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const { setObject, removeItem } = Storages();
      let pathUrl = `${config.LoginContext}`;
      let data = { email: this.state.email, password: this.state.password };
      this.setState({ hiddenbar: false });
      await HttpRequest(pathUrl, "POST", data)
        .then(async (resultado: any) => {
          try {
            await this.push();
          } catch (e) {
            console.error("Login: push", e);
          }
          await setObject("user", resultado.user);
          await setObject("token", resultado.token);
          if (this.state.checked) {
            let rememberme = {
              checked: this.state.checked,
              username: this.state.email,
            };
            await setObject("rememberme", rememberme);
          } else {
            await removeItem("checked");
            await removeItem("username");
          }
          this.setState({ loginMessage: "Bienvenido!" });
          this.setState({ password: "" });

          this.props.history.push("/home");
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loginMessage: error.message });
        });
      this.setState({ hiddenbar: true });
      this.setState({ showToast1: true });
    } catch (e) {
      this.setState({ hiddenbar: true });
      console.error("Login: " + e);
    }
  }

  async push() {
    try {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();

      // On succcess, we should be able to receive notifications
      PushNotifications.addListener(
        "registration",
        async (token: PushNotificationToken) => {
          updateToken(token.value);
        }
      );

      // Some issue with your setup and push will not work
      PushNotifications.addListener("registrationError", (error: any) => {
        alert("Error on registration: " + JSON.stringify(error));
      });

      // Show us the notification paylo ad if the app is open on our device
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotification) => {
          let notif = this.state.notification;
          notif.push({
            id: notification.id,
            title: notification.title as string,
            body: notification.body as string,
          });
          this.setState({
            notification: notif,
          });
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: PushNotificationActionPerformed) => {
          let notif = this.state.notification;
          notif.push({
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
          });
          this.setState({
            notification: notif,
          });
          console.log("notif, ", notification);
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <>
        <IonContent class="bg-image">
          <IonItem>
            <IonImg class="img" src={"/assets/img/IconLogo.png"} />
          </IonItem>

          <form onSubmit={(e) => this.handleSubmit(e)} action="post">
            <IonCard class="card-center">
              <IonItem>
                <IonIcon color="primary" icon={personOutline} slot="start" />
                <IonLabel position="floating">Username o Email</IonLabel>
                <IonInput
                  color="dark"
                  required={true}
                  autocomplete="on"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onInput={(email: any) =>
                    this.setState({ email: email.target.value })
                  }
                />
              </IonItem>
              <IonItem>
                <IonIcon color="primary" icon={keyOutline} slot="start" />
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  color="dark"
                  required={true}
                  minlength={8}
                  maxlength={18}
                  name="password"
                  type="password"
                  value={this.state.password}
                  onInput={(password: any) =>
                    this.setState({ password: password.target.value })
                  }
                />
              </IonItem>

              <IonItem>
                <IonIcon color="primary" icon={bulbOutline} slot="start" />
                <IonLabel>Recordar usuario:</IonLabel>
                <IonToggle
                  checked={this.state.checked}
                  onIonChange={(e) =>
                    this.setState({ checked: e.detail.checked })
                  }
                />
              </IonItem>
              <IonProgressBar
                hidden={this.state.hiddenbar}
                type="indeterminate"
              ></IonProgressBar>
              <br />
            </IonCard>
            <IonButton class="btn-login" type="submit">
              Ingresar
            </IonButton>
          </form>

          <IonToast
            isOpen={this.state.showToast1}
            onDidDismiss={() => this.setState({ showToast1: false })}
            message={this.state.loginMessage}
            duration={2000}
          />

          <div id="btn-auth">
            <IonButton class="btn-auth" routerLink="/recover">
              ¿Olvidaste tu usuario o contraseña?
            </IonButton>
            <IonButton class="btn-auth" routerLink="/signup">
              Quiero registrarme
            </IonButton>
          </div>
        </IonContent>
      </>
    );
  }
}
