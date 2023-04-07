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
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import Autocomplete from "react-google-autocomplete";
import {
  mailOpenOutline,
  personOutline,
  keyOutline,
  cardOutline,
  phonePortraitOutline,
  arrowBackOutline,
  peopleOutline,
  locationOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import * as H from "history";
import { ProviderRegisterContainer } from "./ProviderRegister";
import { constants } from "../../hooks/Constants";

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
    province: string;
    country: string;
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
    kind: string;
    postalCode: string;
    validPostalCode: boolean;
    provider: any;
  }
> {
  constructor(props: any) {
    super(props);
    const param = this.props.history.location.pathname
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
      province: "",
      country: "",
      documentId: "",
      uniquecode: "NEWUSER001",
      showAlert: false,
      headerText: "Advertencia",
      loginMessage: "",
      hiddenbar: true,
      address: "",
      privacyPolicy: false,
      params: param ? param : "",
      paramsId: "",
      isOwner: false,
      kind: "user",
      postalCode: "",
      validPostalCode: false,
      provider: {},
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
    this.setState({ kind: "user" });
    if (this.state.paramsId) {
      await HttpRequest(
        `${config.FileContext}/${this.state.paramsId}`,
        "DELETE"
      )
        .then(() => {})
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
        this.setState({ headerText: "Bienvenido" });
        if (response) {
          console.log(response);
          this.setState({ paramsId: response?._id });
          this.setState({ username: response?.Correo.split("@")[0] });
          this.setState({ email: response?.Correo });
          this.setState({ phone: response?.Telefono });
          this.setState({ firstName: response?.Nombres });
          this.setState({ lastName: response?.Apellidos });
          this.setState({ blockNumber: Number(response?.Torre) });
          this.setState({ homeNumber: Number(response?.Apartamento) });
          this.setState({ documentId: response?.Identification });
          this.setState({ uniquecode: response?.Uniquecode });
          this.setState({
            isOwner: response?.Propietario === "si" ? true : false,
          });
          this.setState({ city: response?.Ciudad });
          this.setState({ whereIlive: "Conjunto" });
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
      } /*  else if (!this.state.city) {
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
      }  */ else {
        const pathUrl = `${config.AuthSignUp}`;
        let data = {
          roles: [
            this.state.kind === "user"
              ? config.RolUserAccess
              : config.RolProviderAccess,
          ],
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone,
          firstName: this.state.firstName,
          address: this.state.address + " ," + this.state.postalCode,
          documentId: this.state.documentId,
          uniquecode: this.state.uniquecode,
          city: this.state.city + " " + this.state.province,

          // city: this.state.city,
          acceptPolicity: this.state.privacyPolicy,
        };
        if (this.state.paramsId) {
          // data.roles.push(this.state.uniquecode);
          data = { ...data, ...{ isOwner: this.state.isOwner } };
        }
        if (this.state.kind === "company") {
          data = {
            ...data,
            ...{
              uniquecode:
                this.state.province +this.state.city.slice(0, 2)+
                this.state.firstName.slice(0, 3) +
                Math.random().toString().slice(2, 5),
              paymentMethod: "efectivo",
              billType: "Tax",
              deliveryExtraCharge: 0,
              schedule: this.state.provider.schedule,
              categories: this.state.provider.subCategory,
              deliveryCharge: this.state.provider.deliveryCharge,
              category: this.state.provider.category,
              urlImage: this.state.provider.urlImage,
            },
          };
        } else {
          data =
            this.state.whereIlive === "Conjunto"
              ? {
                  ...data,
                  ...{ lastName: this.state.lastName },
                  ...{
                    blockNumber: this.state.blockNumber,
                    homeNumber: this.state.homeNumber,
                  },
                }
              : {
                  ...data,
                  ...{
                    blockNumber: 0,
                    homeNumber: 0,
                  },
                };
        }
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
            } else if (response?.userService?.enabled) {
              this.ClearState();
              this.setState({
                loginMessage: "Ya pudes ingresar a tu cuenta Vecinoo",
              });
              ///username or email already exists
            } else {
              this.setState({ headerText: "Error" });
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
              <IonSegment
                value={this.state.kind}
                onIonChange={(e) => {
                  this.setState({
                    kind: e.detail.value ? e.detail.value : "user",
                  });
                }}
              >
                <IonSegmentButton value="user" layout="icon-start">
                  <IonIcon icon={personOutline} />
                  <IonLabel> {constants.USER_TAB}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="company" layout="icon-start">
                  <IonIcon icon={peopleOutline} />
                  <IonLabel> {constants.COMPANY_TAB}</IonLabel>
                </IonSegmentButton>
              </IonSegment>

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
              <IonGrid>
                <IonRow>
                  <IonCol size-md="6" size-xs="12">
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
                      <IonText color="danger">
                        La contraseña no coincide
                      </IonText>
                    ) : null}
                  </IonCol>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem>
                      <IonIcon color="primary" icon={keyOutline} slot="start" />
                      <IonLabel position="floating">
                        Confirmar contraseña
                      </IonLabel>
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
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonGrid>
                <IonLabel>Datos de contacto</IonLabel>
                <IonRow>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={mailOpenOutline}
                        slot="start"
                      />
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
                  </IonCol>
                  <IonCol size-md="6" size-xs="12">
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
                            phone: phone.target.value
                              ?.toString()
                              .trim()
                              .replace(/[^0-9]/gi, ""),
                          })
                        }
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonGrid>
                <IonLabel>Full name</IonLabel>
                <IonRow>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={personOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">
                        {this.state.kind !== "user" ? "Company " : null}Name{" "}
                      </IonLabel>
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
                  <IonCol
                    size-md="6"
                    size-xs="12"
                    hidden={this.state.kind !== "user" ? true : false}
                  >
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
                        required={this.state.kind === "user" ? true : false}
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
              {this.state.kind === "company" ? (
                <ProviderRegisterContainer
                  providerTrigger={(response: any) => {
                    this.setState({ provider: response });
                  }}
                />
              ) : null}
              <IonGrid>
                <IonRow>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem lines="none">
                      <IonIcon
                        color="primary"
                        icon={locationOutline}
                        slot="start"
                      />
                      <IonLabel position="stacked">Address</IonLabel>
                      <Autocomplete
                        apiKey={config.googleApiKey}
                        style={{
                          width: "100%",
                          height: 40,
                          border: "0px ",
                        }}
                        placeholder="Enter your address"
                        debounce={500}
                        options={{
                          types: ["geocode"],
                          componentRestrictions: { country: ["ca","co"] },
                        }}
                        onPlaceSelected={(place: any) => {
                          console.log(place);
                          this.setState({
                            address: place.formatted_address,
                            postalCode:
                              place.address_components[
                                place.address_components.length - 1
                              ].long_name,
                            city:
                              place.address_components[
                                place.address_components.length - 4
                              ].long_name,
                            country:
                              place.address_components[
                                place.address_components.length - 2
                              ].long_name,
                            province:
                              place.address_components[
                                place.address_components.length - 3
                              ].short_name,
                          });

                        }}
                      />
                      {/*  <IonInput
                        color={"dark"}
                        required={true}
                        autocomplete="on"
                        type="text"
                        value={this.state.address}
                        onIonChange={(e: any) => {
                          this.setState({
                            address: e.target.value,
                          });
                        }}
                      /> */}
                    </IonItem>
                  </IonCol>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={locationOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">Postal Code</IonLabel>
                      <IonInput
                        color={
                          this.state.postalCode.length < 6
                            ? "dark"
                            : this.state.validPostalCode
                            ? "success"
                            : "danger"
                        }
                        required={true}
                        autocomplete="on"
                        type="text"
                        value={this.state.postalCode}
                        onIonChange={(e: any) => {
                          const postalCodeRegex = new RegExp(
                            /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d|\d{6})$/i,
                          );
                          this.setState({
                            postalCode: e.target.value.toUpperCase(),
                            validPostalCode: postalCodeRegex.test(
                              e.target.value
                            ),
                          });
                        }}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                {/*                 <AddressContainer
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
                ></AddressContainer> */}
              </IonGrid>
              <IonItem hidden={true}>
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
                  value={
                    this.state.documentId ||
                    Math.random().toString().slice(2, 11)
                  }
                  onIonChange={(e: any) =>
                    this.setState({
                      documentId: e.target.value
                        .toString()
                        .trim()
                        .replace(/[^0-9]/gi, ""),
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
            <IonButton
              disabled={this.state.privacyPolicy ? false : true}
              class="btn-login"
              type={"submit"}
            >
              {"Registrarse"}
            </IonButton>
          </form>

          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => this.setState({ showAlert: false })}
            header={this.state.headerText}
            message={this.state.loginMessage}
            buttons={[
              {
                text: "",
                role: "cancel",
                cssClass: "secondary",
              },
              {
                text: "Confirmar",
                handler: async () => {
                  try {
                    if (this.state.headerText === "Perfecto")
                      this.props.history.push("/login");
                  } catch (e) {
                    console.error("HomePage.handler: " + e);
                  }
                },
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
