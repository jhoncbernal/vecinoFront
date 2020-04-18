import React from "react";
import {
  IonPage,
  IonContent,
  IonRefresherContent,
  IonRefresher,
  IonTitle,
  IonImg,
  IonToolbar,
  IonText,
  IonButtons,
  IonButton,
  IonInput,
  IonList,
  IonItem
} from "@ionic/react";
import HomeAdminPageContainer from "../components/HomeAdminContainer";
import HomeProviderContainer from "../components/HomeProviderContainer";
import FloatingButtonsMenuContainer from "../components/FloatingButtonsMenuContainer";
import { RefresherEventDetail } from "@ionic/core";
import { Storages } from "../hooks/Storage";
import HomeUserContainer from "../components/HomeUserContainer";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from "@capacitor/core";

const { PushNotifications } = Plugins;
const notifications = [
  { id: "id", title: "Test Push", body: "This is my first push notification" }
];
export class Home extends React.Component<
  { history: any },
  {
    currentUser: any;
    notification: { id: string; title: string; body: string }[];
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentUser: "",
      notification: notifications
    };
    this.preValues();
  }

  async preValues() {
    try {
      const { getObject } = await Storages();
      const user: any = await getObject("user");
      if (!user) {
        const err = new Error();
        err.message = "sus credenciales vencieron";
        throw err;
      } else {
        this.setState({ currentUser: user.obj });
      }
    } catch (e) {
      console.error(e);
    }
  }
  push() {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener(
      "registration",
      (token: PushNotificationToken) => {
        alert("Push registration success, token: " + token.value);
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
          body: notification.body as string
        });
        this.setState({
          notification: notif
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
          body: notification.notification.data.body
        });
        this.setState({
          notification: notif
        });
        console.log("notif, ", notification);
      }
    );
  }

  doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.props.history.go(0);
      event.detail.complete();
    }, 2000);
  }

  render() {
    const { history } = this.props;
    const { notification } = this.state;

    return (
      <IonPage>
        <br />
        <br />
        <IonContent class="bg-image">
          <IonButton
            onClick={() => {
              this.push();
            }}
          >
            Register push
          </IonButton>
          <IonList>
            {notification.map(noty => {
              return <IonItem>{noty.title}</IonItem>;
            })}
          </IonList>
          <IonToolbar>
            <IonTitle>
              <IonImg class="img" src={"/assets/img/IconLogo.png"} />
              {this.state.currentUser.firstName ? (
                <IonText color="primary">{`${this.state.currentUser.firstName}`}</IonText>
              ) : (
                <></>
              )}
            </IonTitle>
          </IonToolbar>
          <FloatingButtonsMenuContainer
            history={history}
          ></FloatingButtonsMenuContainer>
          {this.state.currentUser.roles ? (
            this.state.currentUser.roles.includes(
              "ROLE_ADMINISTRATION_ACCESS"
            ) ? (
              <HomeAdminPageContainer
                history={history}
              ></HomeAdminPageContainer>
            ) : this.state.currentUser.roles.includes(
                "ROLE_PROVIDER_ACCESS"
              ) ? (
              <HomeProviderContainer
                history={history}
                currentUser={this.state.currentUser}
              ></HomeProviderContainer>
            ) : (
              <HomeUserContainer
                history={history}
                currentUser={this.state.currentUser}
              ></HomeUserContainer>
            )
          ) : null}
          <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
            <IonRefresherContent
              color="primary"
              pullingIcon="arrow-dropdown"
              pullingText="Deslice para actualizar"
              refreshingSpinner="circles"
              refreshingText="Actualizando..."
            ></IonRefresherContent>
          </IonRefresher>
        </IonContent>
      </IonPage>
    );
  }
}
export default Home;
