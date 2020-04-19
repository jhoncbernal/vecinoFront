import React from "react";
import {
  IonPage,
  IonContent,
  IonRefresherContent,
  IonRefresher,
  IonTitle,
  IonImg,
  IonToolbar,
  IonText
} from "@ionic/react";
import HomeAdminPageContainer from "../components/HomeAdminContainer";
import HomeProviderContainer from "../components/HomeProviderContainer";
import FloatingButtonsMenuContainer from "../components/FloatingButtonsMenuContainer";
import { RefresherEventDetail } from "@ionic/core";
import { Storages } from "../hooks/Storage";
import HomeUserContainer from "../components/HomeUserContainer";
import config from "../config";
import SideMenuCar from "../components/Provider/SideMenuCar";

export class Home extends React.Component<
  { history: any },
  {
    currentUser: any;
    pendingShoppingCar: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentUser: "",
      pendingShoppingCar: {}
    };
    this.preValues();
    this.handlerDataSide = this.handlerDataSide.bind(this);
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

  renderSideMenu(roles: string) {
    if (roles && roles.includes(config.RolProviderAccess)) {
      return (
        <SideMenuCar datSide={this.state.pendingShoppingCar}></SideMenuCar>
      );
    }
  }

  handlerDataSide(data: any) {
    this.setState({ pendingShoppingCar: data });
  }
  doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      console.log("Async operation has ended");
      this.props.history.go(0);
      event.detail.complete();
    }, 2000);
  }

  render() {
    const { history } = this.props;

    return (
      <IonPage>
        <br />
        <br />
        <IonContent class="bg-image">
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
            this.state.currentUser.roles.includes(config.RolAdminAccess) ? (
              <HomeAdminPageContainer
                history={history}
              ></HomeAdminPageContainer>
            ) : this.state.currentUser.roles.includes(
                config.RolProviderAccess
              ) ? (
              <HomeProviderContainer
                history={history}
                currentUser={this.state.currentUser}
                handlerDataSide={this.handlerDataSide}
              ></HomeProviderContainer>
            ) : (
              <HomeUserContainer
                history={history}
                currentUser={this.state.currentUser}
              ></HomeUserContainer>
            )
          ) : null}
          {this.renderSideMenu(this.state.currentUser.roles)}
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
