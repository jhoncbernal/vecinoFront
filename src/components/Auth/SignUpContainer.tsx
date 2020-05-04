/* eslint-disable array-callback-return */
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
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonCheckbox,
} from "@ionic/react";
import {
  mailOpenOutline,
  personOutline,
  keyOutline,
  cardOutline,
  phonePortraitOutline,
  arrowBackOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";

import AddressContainer from "./AddressContainer";

export class SignUpPage extends React.Component<
  {},
  {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    phone: number | string;
    firstName: string;
    lastName: string;
    address: string;
    blockNumber: number | string;
    homeNumber: number | string;
    whereIlive: string;
    city: string;
    documentId: number | string;
    privacyPolicy: boolean;
    uniquecode: string | undefined;
    showToast1: boolean;
    loginMessage: string;
    hiddenbar: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      firstName: "",
      lastName: "",
      blockNumber: "",
      homeNumber: "",
      whereIlive: "",
      city: "",
      documentId: "",
      uniquecode: "",
      showToast1: false,
      loginMessage: "",
      hiddenbar: true,
      address: "",
      privacyPolicy: false,
    };
    this.getAllNeighborhoodNames();
  }
  ClearState() {
    this.setState({ username: "" });
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ confirmpassword: "" });
    this.setState({ phone: "" });
    this.setState({ firstName: "" });
    this.setState({ lastName: "" });
    this.setState({ blockNumber: "" });
    this.setState({ homeNumber: "" });
    this.setState({ documentId: "" });
  }

  async getAllNeighborhoodNames() {}
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (this.state.password !== this.state.confirmpassword) {
        this.setState({
          loginMessage: "la confirmacion de contraseña no coincide",
        });
        this.setState({ showToast1: true });
      } else if(!this.state.city){
        this.setState({
          loginMessage: "Se debe seleccionar una ciudad",
        });
        this.setState({ showToast1: true });
      }
      else if (!this.state.uniquecode) {
        const complement = this.state.whereIlive
          ? this.state.whereIlive
          : "sector";
        this.setState({
          loginMessage: "Se debe seleccionar un " + complement,
        });
        this.setState({ showToast1: true });
      } else {
        let pathUrl = `${config.AuthSignUp}`;
        let data = {
          roles: ["ROLE_USER_ACCESS"],
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          documentId: this.state.documentId,
          uniquecode: this.state.uniquecode,
          city: this.state.city,
          acceptPolicity: this.state.privacyPolicy,
        };
        data =
          this.state.whereIlive === "Conjunto"
            ? {
                ...data,
                ...{
                  blockNumber: this.state.blockNumber,
                  homeNumber: this.state.homeNumber,
                },
              }
            : {
                ...data,
                ...{
                  address: this.state.address,
                  blockNumber: 0,
                  homeNumber: 0,
                },
              };
        this.setState({ hiddenbar: false });
        await HttpRequest(pathUrl, "POST", data)
          .then((response: any) => {
            this.setState({ hiddenbar: true });
            if (response.emailResult) {
              this.ClearState();
              this.setState({
                loginMessage:
                  "se envio un correo de verificacion de cuenta a " +
                  response.emailResult.email.result.accepted[0],
              });
            } else {
              this.setState({ loginMessage: response.message });
              console.error(response.message);
            }
            this.setState({ showToast1: true });
          })
          .catch((error) => {
            throw error;
          });
      }
    } catch (e) {
      this.setState({ hiddenbar: true });
      this.setState({ loginMessage: e.message });
      this.setState({ showToast1: true });
      console.error("Error:", e);
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
            <IonCard class="home-card-center">
              <IonItem>
                <IonIcon color="primary" icon={personOutline} slot="start" />
                <IonLabel position="floating">Nombre de usuario</IonLabel>
                <IonInput
                  minlength={8}
                  maxlength={12}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="text"
                  value={this.state.username}
                  onIonChange={(e: any) =>
                    this.setState({ username: e.target.value.trim() })
                  }
                />
              </IonItem>
              <IonItem>
                <IonIcon color="primary" icon={mailOpenOutline} slot="start" />
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  minlength={8}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="email"
                  value={this.state.email}
                  onIonChange={(email: any) =>
                    this.setState({ email: email.target.value })
                  }
                />
              </IonItem>
              <IonItem>
                <IonIcon
                  color="primary"
                  icon={phonePortraitOutline}
                  slot="start"
                />
                <IonLabel position="floating">Telefono</IonLabel>
                <IonInput
                  minlength={8}
                  maxlength={10}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="tel"
                  value={this.state.phone}
                  onIonChange={(phone: any) =>
                    this.setState({ phone: phone.target.value })
                  }
                />
              </IonItem>
              <IonGrid>
                <IonLabel>Nombre completo</IonLabel>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={personOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">Nombre</IonLabel>
                      <IonInput
                        minlength={4}
                        maxlength={20}
                        color="dark"
                        required={true}
                        autocomplete="on"
                        type="text"
                        value={this.state.firstName}
                        onIonChange={(e: any) =>
                          this.setState({ firstName: e.target.value })
                        }
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={personOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">Apellido</IonLabel>
                      <IonInput
                        minlength={4}
                        maxlength={20}
                        color="dark"
                        required={true}
                        autocomplete="on"
                        type="text"
                        value={this.state.lastName}
                        onIonChange={(e: any) =>
                          this.setState({ lastName: e.target.value })
                        }
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <AddressContainer
                accionTrigger={(response: any) => {
                  if (response.whereIlive) {
                    this.setState({ whereIlive: response.whereIlive });
                    this.setState({ uniquecode: response.uniquecode });
                    this.setState({city:response.city});
                    if (response.homeNumber && response.blockNumber) {
                      this.setState({ homeNumber: response.homeNumber });
                      this.setState({ blockNumber: response.blockNumber });
                    }
                    if (response.address) {
                      this.setState({ address: response.address });
                    }
                  }
                }}
              ></AddressContainer>
              <IonItem>
                <IonIcon color="primary" icon={cardOutline} slot="start" />
                <IonLabel position="floating">
                  Numero de identificación
                </IonLabel>
                <IonInput
                  minlength={8}
                  maxlength={20}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="tel"
                  value={this.state.documentId}
                  onIonChange={(e: any) =>
                    this.setState({ documentId: e.target.value })
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
                  maxlength={12}
                  name="password"
                  type="password"
                  value={this.state.password}
                  onIonChange={(password: any) =>
                    this.setState({ password: password.target.value })
                  }
                />
              </IonItem>
              <IonItem>
                <IonIcon color="primary" icon={keyOutline} slot="start" />
                <IonLabel position="floating">Confirmar contraseña</IonLabel>
                <IonInput
                  color="dark"
                  required={true}
                  minlength={8}
                  maxlength={12}
                  name="password"
                  type="password"
                  value={this.state.confirmpassword}
                  onIonChange={(confirmpassword: any) =>
                    this.setState({
                      confirmpassword: confirmpassword.target.value,
                    })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel>
                  <a href="/PrivacyPolicy">Acepto las politica de privacidad</a>
                </IonLabel>
                <IonCheckbox
                  checked={this.state.privacyPolicy}
                  onIonChange={(e) =>
                    this.setState({ privacyPolicy: e.detail.checked })
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
              Registrarse
            </IonButton>
          </form>
          <IonToast
            isOpen={this.state.showToast1}
            color="warning"
            onDidDismiss={() => this.setState({ showToast1: false })}
            message={this.state.loginMessage}
            duration={4000}
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
