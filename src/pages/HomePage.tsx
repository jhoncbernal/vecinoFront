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
  IonAlert,
} from "@ionic/react";
import HomeAdminPageContainer from "../components/HomeAdminContainer";
import HomeProviderContainer from "../components/HomeProviderContainer";
import FloatingButtonsMenuContainer from "../components/FloatingButtonsMenuContainer";
import { RefresherEventDetail } from "@ionic/core";
import { Storages } from "../hooks/Storage";
import HomeUserContainer from "../components/HomeUserContainer";
import config from "../config";
import SideMenuCar from "../components/Provider/SideMenuCar";
import * as H from "history";
export class Home extends React.Component<
  { history: H.History },
  {
    currentUser: any;
    pendingShoppingCar: any;
    showAlert: boolean;
    errorMessage: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentUser: "",
      pendingShoppingCar: {},
      showAlert: false,
      errorMessage: "",
    };
    this.preValues();
    this.handlerDataSide = this.handlerDataSide.bind(this);
  }

  async preValues() {
    try {
      const { history } = this.props;

      const { getObject } = await Storages();
      const user: any = await getObject("user");

      if (!user) {
        let message = "sus credenciales vencieron";
        this.setState({ errorMessage: message });
        this.setState({ showAlert: true });
        history.push("/login");
      } else {
        this.setState({ currentUser: user.obj });
      }
    } catch (e) {
      console.error(e);
    }
  }
  async doRefresh(event: CustomEvent<RefresherEventDetail>, his: H.History) {
    try {
      setTimeout(() => {
        event.detail.complete();
        his.go(0);
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  renderSideMenu(roles: string) {
    if (roles && roles.includes(config.RolProviderAccess)) {
      return (
        <SideMenuCar dataSide={this.state.pendingShoppingCar}></SideMenuCar>
      );
    }
  }

  handlerDataSide(data: any) {
    this.setState({ pendingShoppingCar: data });
  }

  render() {
    const { history } = this.props;

    return (
      <IonPage>
        <IonContent class="bg-image">
          <IonRefresher
            slot="fixed"
            onIonRefresh={(e) => {
              this.doRefresh(e, history);
            }}
          >
            <IonRefresherContent
              refreshing-spinner={"bubbles"}
            ></IonRefresherContent>
          </IonRefresher>
          <FloatingButtonsMenuContainer
            history={history}
            currentUser={this.state.currentUser}
          ></FloatingButtonsMenuContainer>
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
        </IonContent>
        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => this.setState({ showAlert: false })}
          header={"Advertencia"}
          subHeader={"se produjo un error debido a que:"}
          message={this.state.errorMessage}
          buttons={["OK"]}
        />

        {this.renderSideMenu(this.state.currentUser.roles)}
      </IonPage>
    );
  }
}
export default Home;
