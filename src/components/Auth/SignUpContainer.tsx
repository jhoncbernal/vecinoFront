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
import {
  mailOpenOutline,
  personOutline,
  keyOutline,
  phonePortraitOutline,
  arrowBackOutline,
  peopleOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import * as H from "history";
import { ProviderRegisterContainer } from "./ProviderRegister";
import { constants } from "../../hooks/Constants";
import GoogleAddressContainer from "./GoogleAddressContainer";
interface SignUpPageProps {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  phone: number | string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  country: string;
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
  cityCode: string;
  stateCode: string;
  countryCode: string;
  userPropertyInfo: {
    sectionNumber: string;
    propertyNumber: string;
  };
  propertyInfo: {
    numberOfProperties: number | string;
    numberOfSections: number | string;
    propertyType: string;
    sectionType: string;
  };
  success: boolean;
}
const firstState: SignUpPageProps = {
  username: "",
  email: "",
  password: "",
  confirmpassword: "",
  phone: "",
  firstName: "",
  lastName: "",
  city: "",
  province: "",
  country: "",
  uniquecode: "NEWUSER001",
  showAlert: false,
  headerText: "Advertencia",
  loginMessage: "",
  hiddenbar: true,
  address: "",
  privacyPolicy: false,
  params: "",
  paramsId: "",
  isOwner: false,
  kind: "user",
  postalCode: "",
  validPostalCode: false,
  provider: {},
  cityCode: "",
  stateCode: "",
  countryCode: "",
  userPropertyInfo: {
    sectionNumber: "",
    propertyNumber: "",
  },
  propertyInfo: {
    numberOfSections: 0,
    sectionType: "",
    numberOfProperties: 0,
    propertyType: "",
  },
  success: false,
};
export class SignUpPage extends React.Component<
  { history: H.History },
  SignUpPageProps
> {
  constructor(props: any) {
    super(props);
    const param = this.props.history.location.pathname
      .replace("/signup", "")
      .replace("/", "");
    this.state = { ...firstState, params: param };
    if (param) {
      this.setData();
    }
  }
  async ClearState() {
    this.setState(firstState);
    if (this.state.paramsId) {
      try {
        await HttpRequest(
          `${config.FileContext}/${this.state.paramsId}`,
          "DELETE",
        );
      } catch (error) {
        this.setState({
          headerText: "Error",
          loginMessage: JSON.stringify(error),
          params: "",
        });
      }
    }
  }

  async setData() {
    try {
      const response = await HttpRequest(
        `${config.FileContext}/${this.state.params}`,
        "GET",
      );
      if (response) {
        const {
          _id,
          Correo,
          Telefono,
          Nombres,
          Apellidos,
          Uniquecode,
          Propietario,
          Ciudad,
        } = response;
        this.setState({
          hiddenbar: true,
          headerText: "Bienvenido",
          paramsId: _id,
          username: Correo.split("@")[0],
          email: Correo,
          phone: Telefono,
          firstName: Nombres,
          lastName: Apellidos,
          uniquecode: Uniquecode,
          isOwner: Propietario === "si" ? true : false,
          city: Ciudad,
          loginMessage:
            "Estas a un paso de finalizar tu registro, completa los espacios en blanco y da clic en el boton registrarse",
          showAlert: true,
        });
      }
    } catch (error) {
      this.setState({
        headerText: "Error",
        loginMessage: JSON.stringify(error),
        params: "",
      });
    }
  }

  handleSegmentChange = (e: CustomEvent) => {
    const value = e.detail.value ? e.detail.value : "user";
    this.setState({ kind: value });
  };

  handleDimmisAlert = () => {
    this.setState({ showAlert: false });
    if (this.state.success) {
      this.props.history.push("/login");
      this.ClearState();
    }
  };
  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (this.state.password !== this.state.confirmpassword) {
        this.setState({
          loginMessage: "la confirmacion de contraseña no coincide",
          showAlert: true,
        });
      } else {
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
          address: this.state.address,
          postalCode: this.state.postalCode,
          uniquecode: this.state.uniquecode,
          cityName: this.state.city,
          cityCode: this.state.cityCode,
          stateCode: this.state.stateCode,
          countryCode: this.state.countryCode,
          acceptPolicity: this.state.privacyPolicy,
        };
        if (this.state.paramsId) {
          data = { ...data, ...{ isOwner: this.state.isOwner } };
        }
        if (this.state.kind === "company") {
          data = {
            ...data,
            ...{
              uniquecode:
                this.state.province +
                this.state.city.slice(0, 2) +
                this.state.firstName.slice(0, 3) +
                Math.random().toString().slice(2, 5),
              paymentMethod: "Cash",
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
          data = {
            ...data,
            ...{
              lastName: this.state.lastName,
              propertyInfo: this.state.userPropertyInfo,
            },
          };
        }

        this.setState({ hiddenbar: false });

        const response = await HttpRequest(pathUrl, "POST", data);
        this.setState({ hiddenbar: true });
        if (response.emailResult) {
          const msg =
            "se envio un correo de verificacion de cuenta a " +
            this.state.email;

          this.setState({
            loginMessage: msg,
            showAlert: true,
            success: true,
          });
        } else if (response?.userService?.enabled) {
          this.ClearState();
          this.setState({
            loginMessage: "Ya pudes ingresar a tu cuenta Vecinoo",
            showAlert: true,
            success: true,
          });
        } else {
          this.setState({
            loginMessage: response.message,
            showAlert: true,
          });
          console.error(response.message);
        }
      }
    } catch (e) {
      this.setState({
        hiddenbar: true,
        loginMessage: JSON.stringify(e),
        showAlert: true,
        success: false,
      });
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
                onIonChange={this.handleSegmentChange}
              >
                <IonSegmentButton value="user" layout="icon-start">
                  <IonIcon icon={personOutline} />
                  <IonLabel>{constants.USER_TAB}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="company" layout="icon-start">
                  <IonIcon icon={peopleOutline} />
                  <IonLabel>{constants.COMPANY_TAB}</IonLabel>
                </IonSegmentButton>
              </IonSegment>

              <IonItem>
                <IonIcon color="primary" icon={personOutline} slot="start" />
                <IonLabel position="floating">{constants.USER_NICK}</IonLabel>
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
                    const target = e.target as HTMLInputElement;
                    this.setState({
                      username: target.value.trim().replace(/[^a-z0-9]/gi, ""),
                    });
                  }}
                />
              </IonItem>

              <IonGrid>
                <IonRow>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem>
                      <IonIcon color="primary" icon={keyOutline} slot="start" />
                      <IonLabel position="floating">
                        {constants.PASSWORD}
                      </IonLabel>
                      <IonInput
                        color="dark"
                        minlength={8}
                        maxlength={12}
                        name="password"
                        required
                        type="password"
                        value={this.state.password}
                        onIonChange={(event: any) => {
                          const target = event.target as HTMLInputElement;
                          if (target.value.length >= 8) {
                            this.setState({
                              password: target.value,
                            });
                          }
                        }}
                      />
                    </IonItem>
                    {this.state.confirmpassword.length >= 8 &&
                      this.state.confirmpassword !== this.state.password && (
                        <IonText color="danger">
                          La contraseña no coincide
                        </IonText>
                      )}
                  </IonCol>
                  <IonCol size-md="6" size-xs="12">
                    <IonItem>
                      <IonIcon color="primary" icon={keyOutline} slot="start" />
                      <IonLabel position="floating">
                        {constants.CONFIRM_PASSWORD}
                      </IonLabel>
                      <IonInput
                        color={
                          this.state.confirmpassword.length >= 8 &&
                          this.state.confirmpassword !== this.state.password
                            ? "danger"
                            : "dark"
                        }
                        minlength={8}
                        maxlength={12}
                        name="password2"
                        required
                        type="password"
                        value={this.state.confirmpassword}
                        onIonChange={(event) => {
                          const target = event.target as HTMLInputElement;
                          if (target.value.length >= 8) {
                            this.setState({
                              confirmpassword: target.value,
                            });
                          }
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
                      <IonLabel position="floating">{constants.EMAIL}</IonLabel>
                      <IonInput
                        type="email"
                        color="dark"
                        minlength={8}
                        required={true}
                        autocomplete="on"
                        value={this.state.email}
                        onIonChange={(e) => {
                          const value = e.detail.value;
                          if (value && value?.length >= 0) {
                            this.setState({ email: value });
                          }
                        }}
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
                      <IonLabel position="floating">
                        {constants.MOBILE}
                      </IonLabel>
                      <IonInput
                        type="tel"
                        color="dark"
                        minlength={8}
                        maxlength={10}
                        required={true}
                        autocomplete="on"
                        value={this.state.phone}
                        onIonChange={(e) => {
                          const value = e.detail.value
                            ?.toString()
                            .trim()
                            .replace(/[^0-9]/gi, "");
                          if (value && value?.length > 0) {
                            this.setState({ phone: value });
                          }
                        }}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <IonGrid>
                <IonLabel>Full name</IonLabel>
                <IonRow>
                  <IonCol sizeMd="6" sizeXs="12">
                    <IonItem>
                      <IonIcon
                        color="primary"
                        icon={personOutline}
                        slot="start"
                      />
                      <IonLabel position="floating">
                        {this.state.kind !== "user" && "Company "}Name
                      </IonLabel>
                      <IonInput
                        min="4"
                        minlength={4}
                        maxlength={20}
                        color="dark"
                        required
                        autocomplete="on"
                        type="text"
                        value={this.state.firstName}
                        onIonChange={(e) => {
                          const target = e.target as HTMLInputElement;
                          if (target.value.length >= 4)
                            this.setState({
                              firstName: target.value.replace(
                                /[^A-Za-z ñ]/gi,
                                "",
                              ),
                            });
                        }}
                      />
                    </IonItem>
                  </IonCol>
                  {this.state.kind === "user" && (
                    <IonCol sizeMd="6" sizeXs="12">
                      <IonItem>
                        <IonIcon
                          color="primary"
                          icon={personOutline}
                          slot="start"
                        />
                        <IonLabel position="floating">Last name</IonLabel>
                        <IonInput
                          min="4"
                          minlength={4}
                          maxlength={20}
                          color="dark"
                          required
                          autocomplete="on"
                          type="text"
                          value={this.state.lastName}
                          onIonChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (target.value.length >= 4)
                              this.setState({
                                lastName: target.value.replace(
                                  /[^A-Za-z ñ]/gi,
                                  "",
                                ),
                              });
                          }}
                        />
                      </IonItem>
                    </IonCol>
                  )}
                </IonRow>
              </IonGrid>

              {this.state.kind === "company" && (
                <ProviderRegisterContainer
                  providerTrigger={(response: any) => {
                    this.setState({ provider: response });
                  }}
                />
              )}

              <GoogleAddressContainer
                onAGoogleAddressDataChange={(response: any) => {
                  if (response === undefined) return;
                  this.setState({ address: response.address });
                  this.setState({ postalCode: response.postalCode });
                  this.setState({ city: response.city });
                  this.setState({ province: response.province });
                  const propertyInfo = {
                    sectionNumber: response["propertyInfo.sectionNumber"],
                    propertyNumber: response["propertyInfo.propertyNumber"],
                  };
                  this.setState({ userPropertyInfo: propertyInfo });
                  this.setState({
                    uniquecode: response?.neighborhood?.uniquecode,
                  });
                  this.setState({ cityCode: response.cityCode });
                  this.setState({ stateCode: response.stateCode });
                  this.setState({ countryCode: response.countryCode });
                }}
                clearData={this.state.success}
              ></GoogleAddressContainer>
              <IonItem>
                <IonLabel>
                  <a href="/PrivacyPolicy">
                    {constants.ACCEPT_PRIVACE_POLICIES}
                  </a>
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
            onDidDismiss={this.handleDimmisAlert}
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
