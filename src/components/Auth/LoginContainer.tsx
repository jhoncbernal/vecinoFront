import React from "react";
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
  IonText,
} from "@ionic/react";
import {
  personOutline,
  keyOutline,
  bulbOutline,
  fingerPrint,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";

import config from "../../config";

import * as H from "history";
import { login, setFingerLogin, getFingerLogin } from "../../hooks/Auth";
import { witchDevice } from "../../hooks/WitchDevice";
import { push } from "../../hooks/Push";

const notifications = [
  { id: "id", title: "Test Push", body: "This is my first push notification" },
];
export class LoginPage extends React.Component<
  { history: H.History },
  {
    email: string;
    password: string;
    checked: boolean;
    showToast1: boolean;
    loginMessage: string;
    fingerToken: string;
    device: string;
    hiddenbar: boolean;
    toastColor: string;
    notification: { id: string; title: string; body: string }[];
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      toastColor: "warning",
      email: "",
      password: "",
      checked: true,
      showToast1: false,
      loginMessage: "",
      fingerToken: "",
      device: "",
      hiddenbar: true,
      notification: notifications,
    };
    this.preValues();
  }
  async preValues() {
    try {
      const { getObject } = Storages();
      let device = await witchDevice();
      this.setState({ device: device });
      if (device === "android") {
        let fingerToken = await getObject("fingerToken");
        this.setState({ fingerToken: fingerToken.obj });
      }
      let rememberme = await getObject("rememberme");
      if (rememberme) {
        this.setState({ email: rememberme.obj.username });
        this.setState({ checked: rememberme.obj.checked });
      }
      let user = await getObject("user");
      if (user) {
        this.props.history.push("/home");
      } else {
        if (
          this.state.device === "android" &&
          this.state.fingerToken &&
          this.state.email
        ) {
          await this.fingerLogin();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  async fingerLogin() {
    if (this.state.fingerToken) {
      let pass = await getFingerLogin(this.state.fingerToken, this.state.email)
        .then((result) => {
          return result;
        })
        .catch((e) => console.error(e));
      if (pass) {
        this.setState({ password: pass });
        this.handleSubmit();
      }
    } else {
      this.setState({ toastColor: "warning" });
      this.setState({
        loginMessage: "Debe ingresar almenos una vez para usar esta funcion!",
      });
      this.setState({ showToast1: true });
    }
  }
  async handleSubmit(e?: any) {
    if (e) {
      e.preventDefault();
    }
    try {

      const { setObject, removeItem } = Storages();
      let pathUrl = `${config.LoginContext}`;
      let data = { email: this.state.email, password: this.state.password };
      this.setState({ hiddenbar: false });
      await HttpRequest(pathUrl, "POST", data)
        .then(async (resultado: any) => {
          try {
            if (
              this.state.device === "android" ||
              this.state.device === "ios"
            ) {
              await push();
            }
          } catch (e) {
            console.error("Login: push", e);
          }
          login(resultado.user, resultado.token);
          if (this.state.device === "android" && !this.state.fingerToken)
            await setFingerLogin(this.state.email, this.state.password);
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
          this.setState({ toastColor: "white" });
          this.setState({ loginMessage: "Bienvenido!" });
          this.setState({ password: "" });

          this.props.history.push("/home");
        })
        .catch((error) => {
          this.setState({ password: "" });
          console.error(error);
          this.setState({ loginMessage: error.message });
        });
      this.setState({ hiddenbar: true });
      this.setState({ showToast1: true });
    } catch (e) {
      this.setState({ password: "" });
      this.setState({ hiddenbar: true });
      console.error("Login: " + e);
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
                    this.setState({ email: email.target.value.trim() })
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

              <IonItem lines="none">
                <IonIcon color="primary" icon={bulbOutline} slot="start" />
                <IonText color="steel">
                  <small>Recordar usuario:</small>
                </IonText>
                <IonToggle
                  slot="end"
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
            color={this.state.toastColor}
            isOpen={this.state.showToast1}
            onDidDismiss={() => this.setState({ showToast1: false })}
            message={this.state.loginMessage}
            duration={4000}
          />

          <div id="btn-auth">
            {this.state.device === "android" &&
            this.state.fingerToken &&
            this.state.email ? (
              <IonButton
                class="btn-auth"
                onClick={async () => {
                  await this.fingerLogin();
                }}
              >
                <IonIcon slot="start" icon={fingerPrint} />
                Ingresar con huella
              </IonButton>
            ) : null}
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
