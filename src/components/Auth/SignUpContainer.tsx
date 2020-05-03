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
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonText,
} from "@ionic/react";
import {
  mailOpenOutline,
  personOutline,
  homeOutline,
  bookOutline,
  keyOutline,
  cardOutline,
  phonePortraitOutline,
  arrowBackOutline,
  mapOutline,
  locationOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import { neighborhoodsNotExist } from "./neighborhoodsNotExist";

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
    city: string;
    blockNumber: number | string;
    homeNumber: number | string;
    documentId: number | string;
    uniquecode: string;
    neighborhoods: Array<any>;
    showToast1: boolean;
    loginMessage: string;
    hiddenbar: boolean;
    whereIlive: string;
    address: string;
    kind: string;
    number: number | null;
    post: string;
    kind2: string;
    number2: number | null;
    number3: number | null;
    post2: string;
    neighborhood: string;
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
      city: "",
      blockNumber: "",
      homeNumber: "",
      documentId: "",
      uniquecode: "",
      neighborhoods: [""],
      showToast1: false,
      loginMessage: "",
      hiddenbar: true,
      whereIlive: "Conjunto",
      address: "",
      kind: "",
      number: null,
      post: "",
      kind2: "",
      number2: null,
      number3: null,
      post2: "",
      neighborhood: "",
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
    this.setState({ neighborhoods: [""] });
  }

  async getAllNeighborhoodNames() {
    let pathUrl = `${config.AllNeighborhoodsContext}`;
    await HttpRequest(pathUrl, "GET", "")
      .then((response: any) => {
        this.setState({ neighborhoods: response });
      })
      .catch((error) => console.error("Error:", error));
  }
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (this.state.password !== this.state.confirmpassword) {
        this.setState({
          loginMessage: "la confirmacion de contraseña no coincide",
        });
        this.setState({ showToast1: true });
      } else if (!this.state.uniquecode) {
        this.setState({
          loginMessage: "Se debe seleccionar un " + this.state.whereIlive,
        });
        this.setState({ showToast1: true });
      } else if (!this.state.city) {
        this.setState({
          loginMessage: "Se debe seleccionar una ciudad",
        });
        this.setState({ showToast1: true });
      } else if (
        this.state.whereIlive === "Barrio" &&
        (!this.state.kind ||
          !this.state.number ||
          !this.state.number2 ||
          !this.state.number3)
      ) {
        this.setState({
          loginMessage: "Los campos de direccion con (*) son Obligatorios",
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
                  address: `${this.state.neighborhood} ${this.state.kind} ${
                    this.state.number ? this.state.number : ""
                  } ${this.state.post} ${this.state.number ? "No" : ""} ${
                    this.state.number2 ? this.state.number2 : ""
                  } ${this.state.number2 ? "-" : ""} ${
                    this.state.number3 ? this.state.number3 : ""
                  } ${this.state.post2}`,
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
    const TypesOfStreets = [
      "Avenida Calle",
      "Avenida Carrera ",
      "Calle",
      "Carrera",
      "Transversal",
      "Diagonal",
      "Variante de Madrid",
    ];
    const TypesPosStreets = ["Norte", "Sur", "Este", "Bis", "No Aplica"];
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
              <IonGrid>
                <IonLabel>Info de recidencia</IonLabel>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonIcon color="primary" icon={mapOutline} slot="start" />
                      <IonLabel>Ciudad</IonLabel>
                      <IonSelect
                        interface="popover"
                        color="dark"
                        placeholder={"Ciudad de recidencia"}
                        onIonChange={(e: any) =>
                          this.setState({ city: e.target.value })
                        }
                      >
                        <IonSelectOption>Madrid</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonSegment
                      value={this.state.whereIlive}
                      onIonChange={(e: any) => {
                        this.setState({ whereIlive: e.detail.value });
                      }}
                    >
                      <IonSegmentButton value="Conjunto">
                        <IonLabel>Conjunto</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton value="Barrio">
                        <IonLabel>Barrio</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={bookOutline}
                        slot="start"
                      />
                      <IonLabel>{this.state.whereIlive}</IonLabel>
                      <IonSelect
                        interface="popover"
                        color="dark"
                        placeholder={"Seleccione un " + this.state.whereIlive}
                        onIonChange={(e: any) => {
                          this.setState({
                            uniquecode: e.target.value.uniquecode,
                          });
                          this.setState({
                            neighborhood: e.target.value.firstName,
                          });
                        }}
                      >
                        {(this.state.whereIlive === "Conjunto"
                          ? this.state.neighborhoods
                          : neighborhoodsNotExist
                        ).map((neighborhood, index) => {
                          if (
                            neighborhood.firstName !== "No esta en la lista"
                          ) {
                            return (
                              <IonSelectOption key={index} value={neighborhood}>
                                {neighborhood.firstName}
                              </IonSelectOption>
                            );
                          }
                        })}
                        )
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>
                {this.state.whereIlive === "Conjunto" ? (
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonIcon
                          color="primary"
                          icon={homeOutline}
                          slot="start"
                        />
                        <IonLabel position="floating">Torre</IonLabel>
                        <IonInput
                          minlength={1}
                          maxlength={3}
                          color="dark"
                          required={true}
                          type="tel"
                          value={this.state.blockNumber}
                          onIonChange={(e: any) =>
                            this.setState({ blockNumber: e.target.value })
                          }
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
                          minlength={2}
                          maxlength={6}
                          color="dark"
                          required={true}
                          autocomplete="on"
                          type="tel"
                          value={this.state.homeNumber}
                          onIonChange={(e: any) =>
                            this.setState({ homeNumber: e.target.value })
                          }
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                ) : (
                  <>
                    <IonLabel position="stacked">Dirección</IonLabel>
                    <IonLabel position="stacked">
                      <p>
                        <small>Ejemplo:</small>
                      </p>
                    </IonLabel>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">Calle (*)</IonLabel>
                          <IonSelect
                            interface="popover"
                            color="dark"
                            value={this.state.kind}
                            onIonChange={(e: any) => {
                              this.setState({ kind: e.target.value });
                            }}
                          >
                            {TypesOfStreets.map((kind, index) => (
                              <IonSelectOption key={index} value={kind}>
                                {kind}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">6a (*)</IonLabel>
                          <IonInput
                            minlength={2}
                            maxlength={4}
                            color="dark"
                            required={true}
                            autocomplete="off"
                            type="tel"
                            value={this.state.number}
                            onIonChange={(e: any) => {
                              this.setState({ number: e.target.value.trim() });
                            }}
                          />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">Sur </IonLabel>
                          <IonSelect
                            interface="popover"
                            color="dark"
                            value={this.state.post}
                            onIonChange={(e: any) => {
                              if (e.target.value === "No Aplica") {
                                this.setState({ post: "" });
                              } else {
                                this.setState({ post: e.target.value });
                              }
                            }}
                          >
                            {TypesPosStreets.map((kind, index) => (
                              <IonSelectOption key={index} value={kind}>
                                {kind}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonLabel position="stacked"> No. </IonLabel>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">25c(*)</IonLabel>
                          <IonInput
                            minlength={2}
                            maxlength={4}
                            color="dark"
                            required={true}
                            autocomplete="off"
                            type="tel"
                            value={this.state.number2}
                            onIonChange={(e: any) => {
                              this.setState({ number2: e.target.value.trim() });
                            }}
                          />
                        </IonItem>
                      </IonCol>
                      <IonLabel position="stacked">
                        <h1> - </h1>
                      </IonLabel>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">65(*)</IonLabel>
                          <IonInput
                            minlength={2}
                            maxlength={4}
                            color="dark"
                            required={true}
                            autocomplete="off"
                            type="tel"
                            value={this.state.number3}
                            onIonChange={(e: any) => {
                              this.setState({ number3: e.target.value });
                            }}
                          />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="stacked">Este </IonLabel>
                          <IonSelect
                            interface="popover"
                            color="dark"
                            value={this.state.post2}
                            onIonChange={(e: any) => {
                              if (e.target.value === "No Aplica") {
                                this.setState({ post2: "" });
                              } else {
                                this.setState({ post2: e.target.value });
                              }
                            }}
                          >
                            {TypesPosStreets.map((kind, index) => (
                              <IonSelectOption key={index} value={kind}>
                                {kind}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                      <IonCol size={"12"}>
                        <IonItem>
                          <IonIcon
                            color="primary"
                            icon={locationOutline}
                            slot="start"
                          />
                          <IonLabel position="stacked">
                            Dirección Generada:
                          </IonLabel>
                          <IonText>{`${this.state.kind} ${
                            this.state.number ? this.state.number : ""
                          } ${this.state.post} ${
                            this.state.number ? "No" : ""
                          } ${this.state.number2 ? this.state.number2 : ""} ${
                            this.state.number2 ? "-" : ""
                          } ${this.state.number3 ? this.state.number3 : ""} ${
                            this.state.post2
                          }`}</IonText>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </>
                )}
              </IonGrid>
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
              <IonItem><a href='/PrivacyPolicy'>Politica de privacidad</a></IonItem>
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
