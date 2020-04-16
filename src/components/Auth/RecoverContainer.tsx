import React, { FormEvent } from "react";

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
  IonFab,
  IonFabButton
} from "@ionic/react";
import { personOutline, arrowBackOutline } from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

export class RecoverContainer extends React.Component<
  {},
  {
    email: string;
    showToast1: boolean;
    loginMessage: string;
    hiddenbar: boolean;
  }
  > {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      showToast1: false,
      loginMessage: "",
      hiddenbar: true
    };
  }

  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      let pathurl = `${config.RecoveryPasswordContext}`;
      let data = { email: this.state.email };
      this.setState({ hiddenbar: false });
      await HttpRequest(pathurl, "POST", data)
        .then((response: any) => {
          this.setState({ hiddenbar: true });
          if (response.emailResult) {
            this.setState({
              loginMessage:
                "se envio un correo para restablecimiento de su cuenta a " +
                response.emailResult.result.accepted[0]
            });
          } else {
            this.setState({ loginMessage: response.message });
            console.error(response.message);
          }
          this.setState({ showToast1: true });
        })
        .catch(error => console.error("Error:", error));
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

          <form onSubmit={e => this.handleSubmit(e)} action="post">
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
              <IonProgressBar
                hidden={this.state.hiddenbar}
                type="indeterminate"
              ></IonProgressBar>
              <br />
            </IonCard>
            <IonButton class="btn-login" type="submit">
              Recuperar
            </IonButton>
          </form>

          <IonToast
            isOpen={this.state.showToast1}
            onDidDismiss={() => this.setState({ showToast1: false })}
            message={this.state.loginMessage}
            duration={2000}
          />

          <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton routerLink="/login">
              <IonIcon icon={arrowBackOutline} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </>
    );
  }
}
