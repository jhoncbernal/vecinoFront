import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import RecoveryPage from "./pages/Auth/RecoveryPage";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/ownStyle.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import PackageManagerPage from "./pages/PackagePage";

const App: React.FC = () => {
  return (
    <IonApp>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/login" component={LoginPage} exact={true} />
              <Route path="/signup" component={SignUpPage} exact={true} />
              <Route path="/signup/:id" component={SignUpPage} exact={true} />
              <Route path="/recover" component={RecoveryPage} />
              <Route path="/home" component={HomePage} exact={true} />
              <Route paht="/packages" component={PackageManagerPage}exact={true}/>
              <Route
                path="/PrivacyPolicy"
                component={PrivacyPolicy}
                exact={true}
              />
              <Route
                path="/"
                render={() => <Redirect to="/login" />}
                exact={true}
              />
            </IonRouterOutlet>
          </IonReactRouter>
        </PersistGate>
      </Provider>
    </IonApp>
  );
};

export default App;
