import React from "react";
import {
  IonContent,
  IonCard,
  IonButton,
} from "@ionic/react";
import config from "../../config";
import { HttpRequest } from "../../hooks/HttpRequest";
import { Storages } from "../../hooks/Storage";
import * as H from "history";
import { User } from "../../entities";
import { termsAndConditions } from "../../pages/PrivacyPolicy";
import "./TermsCondContainer.css";
interface ContainerProps {
  history: H.History;
  currentUser: User;
  data: any;
}
export const TermsCondContainer: React.FC<ContainerProps> = ({
  history,
  currentUser,
  data,
}) => {
  return (
    <IonContent>
      <IonCard>
          {termsAndConditions}
          <br/>
    <IonButton
    class='ion-float-right'
    onClick={async () => {
      let pathUrl = "";
      if (currentUser.roles?.includes(config.RolUserAccess)) {
        pathUrl = `${config.UserContext}/${currentUser._id}`;
      } else if (currentUser.roles?.includes(config.RolAdminAccess)) {
        pathUrl = `${config.AdminContext}/${currentUser._id}`;
      } else {
        pathUrl = `${config.ProviderContext}/${currentUser._id}`;
      }
      await HttpRequest(
        pathUrl,
        "PATCH",
        { acceptPolicity: true },
        true
      )
        .then(async () => {
          const user = currentUser;
          user.acceptPolicity = true;
          const { setObject } = Storages();
          await setObject("user", user);
          data(user, false);
        })
        .catch((error: any) => {
          console.error(error);
          history.go(0);
        });
    }}
  >
    Aceptar
  </IonButton>
  </IonCard>
  </IonContent>
  );
};
