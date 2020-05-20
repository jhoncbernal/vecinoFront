import React, { FormEvent } from "react";

import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonProgressBar,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonCheckbox,
  IonText,
  IonAlert,
} from "@ionic/react";
import {
  mailOpenOutline,
  personOutline,
  keyOutline,
  cardOutline,
  phonePortraitOutline,
  arrowBackOutline,
  businessOutline,
  homeOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import * as H from "history";
import AddressContainer from "./AddressContainer";

export class SignUpPage extends React.Component<
  { history: H.History },
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
    showAlert: boolean;
    headerText: string;
    loginMessage: string;
    hiddenbar: boolean;
    params: string;
    paramsId: string;
    isOwner: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    let param = this.props.history.location.pathname
      .replace("/signup", "")
      .replace("/", "");
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
      showAlert: false,
      headerText: "Advertencia",
      loginMessage: "",
      hiddenbar: true,
      address: "",
      privacyPolicy: false,
      params: param ? param : "",
      paramsId: "",
      isOwner:false
    };
    if (param) {
      this.setData();
    }
  }
  async ClearState() {
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
    if (this.state.paramsId) {
      await HttpRequest(
        `${config.FileContext}/${this.state.paramsId}`,
        "DELETE"
      )
        .then((response: any) => {})
        .catch((error) => {
          this.setState({ headerText: "Error" });
          this.setState({
            loginMessage: error,
          });
          this.setState({ params: "" });
        });
    }
  }

  async setData() {
    await HttpRequest(`${config.FileContext}/${this.state.params}`, "GET")
      .then((response: any) => {
        this.setState({ hiddenbar: true });
        this.setState({ headerText: "Perfecto" });
        if (response) {
          console.log(response)
          this.setState({ paramsId: response?._id });
          this.setState({ username: response?.Correo.split("@")[0] });
          this.setState({ email: response?.Correo });
          this.setState({ phone: response?.Telefono });
          this.setState({ firstName: response?.Nombres });
          this.setState({ lastName: response?.Apellidos });
          this.setState({ blockNumber: Number(response?.Torre)});
          this.setState({ homeNumber: Number(response?.Apartamento)});
          this.setState({ documentId: response?.Identification });
          this.setState({ uniquecode: response?.Uniquecode });
          this.setState({ isOwner: response?.Propietario==="si"?true:false });
          this.setState({ city: response?.Ciudad });
          this.setState({whereIlive:"Conjunto"});
          this.setState({
            loginMessage:
              "Estas a un paso de finalizar tu registro, completa los espacios en blanco y da clic en el boton registrarse",
          });
          this.setState({ showAlert: true });
        }
      })
      .catch((error) => {
        this.setState({ headerText: "Error" });
        this.setState({
          loginMessage: error,
        });
        this.setState({ params: "" });
      });
  }
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (this.state.password !== this.state.confirmpassword) {
        this.setState({
          loginMessage: "la confirmacion de contraseña no coincide",
        });
        this.setState({ showAlert: true });
      } else if (!this.state.city) {
        this.setState({
          loginMessage: "Se debe seleccionar una ciudad",
        });
        this.setState({ showAlert: true });
      } else if (!this.state.uniquecode) {
        const complement = this.state.whereIlive
          ? this.state.whereIlive
          : "sector";
        this.setState({
          loginMessage: "Se debe seleccionar un " + complement,
        });
        this.setState({ showAlert: true });
      } else {
        let pathUrl = `${config.AuthSignUp}`;
        let data = {
          roles: [config.RolUserAccess],
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
        if (this.state.paramsId) {
          data.roles.push(this.state.uniquecode);
          data={...data,...{isOwner:this.state.isOwner}}
        }
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
            this.setState({ headerText: "Perfecto" });
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
            this.setState({ showAlert: true });
          })
          .catch((error) => {
            throw error;
          });
      }
    } catch (e) {
      this.setState({ hiddenbar: true });
      this.setState({ loginMessage: e.message });
      this.setState({ showAlert: true });
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
                  min={"8"}
                  minlength={8}
                  maxlength={12}
                  color="dark"
                  required={true}
                  autocomplete="off"
                  type="text"
                  value={this.state.username}
                  onIonChange={(e: any) => {
                    this.setState({
                      username: e.target.value
                        .trim()
                        .replace(/[^a-z0-9]/gi, ""),
                    });
                  }}
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
                    this.setState({
                      phone: phone.target.value?.toString().trim().replace(/[^0-9]/gi, ""),
                    })
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
                        min={"4"}
                        minlength={4}
                        maxlength={20}
                        color="dark"
                        required={true}
                        autocomplete="on"
                        type="text"
                        value={this.state.firstName}
                        onIonChange={(e: any) =>
                          this.setState({
                            firstName: e.target.value.replace(
                              /[^A-Za-z ñ]/gi,
                              ""
                            ),
                          })
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
                        min={"4"}
                        minlength={4}
                        maxlength={20}
                        color="dark"
                        required={true}
                        autocomplete="on"
                        type="text"
                        value={this.state.lastName}
                        onIonChange={(e: any) =>
                          this.setState({
                            lastName: e.target.value.replace(
                              /[^A-Za-z ñ]/gi,
                              ""
                            ),
                          })
                        }
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              {this.state.params ? (
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonIcon
                          color="primary"
                          icon={businessOutline}
                          slot="start"
                        />
                        <IonLabel position="floating">Torre</IonLabel>
                        <IonInput
                          disabled
                          minlength={1}
                          maxlength={3}
                          color="dark"
                          required={true}
                          type="tel"
                          name={"blockNumber"}
                          value={this.state.blockNumber}
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonIcon
                          color="primary"
                          icon={homeOutline}
                          slot="start"
                        />
                        <IonLabel position="floating">Apartamento</IonLabel>
                        <IonInput
                          disabled
                          minlength={2}
                          maxlength={6}
                          color="dark"
                          required={true}
                          autocomplete="on"
                          type="tel"
                          name={"homeNumber"}
                          value={this.state.homeNumber}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              ) : (
                <AddressContainer
                  accionTrigger={(response: any) => {
                    if (response.whereIlive) {
                      this.setState({ whereIlive: response.whereIlive });
                      this.setState({ uniquecode: response.uniquecode });
                      this.setState({ city: response.city });
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
              )}
              <IonItem>
                <IonIcon color="primary" icon={cardOutline} slot="start" />
                <IonLabel position="floating">
                  Numero de identificación
                </IonLabel>
                <IonInput
                  min={"8"}
                  minlength={8}
                  maxlength={20}
                  color="dark"
                  required={true}
                  autocomplete="on"
                  type="tel"
                  value={this.state.documentId}
                  onIonChange={(e: any) =>
                    this.setState({
                      documentId: e.target.value.toString().trim().replace(/[^0-9]/gi, ""),
                    })
                  }
                />
              </IonItem>
              <IonItem>
                <IonIcon color="primary" icon={keyOutline} slot="start" />
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  min={"8"}
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
              {this.state.confirmpassword !== this.state.password &&
              this.state.confirmpassword.length >= 8 ? (
                <IonText color="danger">La contraseña no coincide</IonText>
              ) : null}
              <IonItem>
                <IonIcon color="primary" icon={keyOutline} slot="start" />
                <IonLabel position="floating">Confirmar contraseña</IonLabel>
                <IonInput
                  color={
                    this.state.confirmpassword !== this.state.password &&
                    this.state.confirmpassword.length >= 8
                      ? "danger"
                      : "dark"
                  }
                  required={true}
                  min={"8"}
                  minlength={8}
                  maxlength={12}
                  name="password2"
                  type="password"
                  value={this.state.confirmpassword}
                  onIonChange={(confirmpassword: any) => {
                    this.setState({
                      confirmpassword: confirmpassword.target.value,
                    });
                  }}
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
            <IonButton
              disabled={
                this.state.confirmpassword === this.state.password &&
                this.state.confirmpassword?.length >= 8
                  ? false
                  : true
              }
              class="btn-login"
              type="submit"
            >
              Registrarse
            </IonButton>
          </form>

          <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() =>this.setState({ showAlert: false })}
          header={this.state.headerText}
          message={this.state.loginMessage}
          buttons={[
            {
              text: "",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Confirmar"
            },
          ]}
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
