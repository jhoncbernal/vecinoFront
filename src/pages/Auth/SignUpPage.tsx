import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { SignUpPage } from "../../components/Auth/SignUpContainer";
import * as H from "history";

interface ContainerProps {
  history: H.History;
}

const Tab2: React.FC<ContainerProps> = ({ history }) => {
  
  return (
    <IonPage>
      <IonContent>
        <SignUpPage history={history}></SignUpPage>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
