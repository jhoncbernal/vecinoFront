import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonIcon,
  IonCard,
  IonText,
  IonModal,
  IonFab,
  IonFabButton,
  IonContent,
  useIonViewDidLeave,
  IonAvatar,
  IonProgressBar,
  IonList,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import {
  arrowBackOutline,
  checkmarkCircleSharp,
  closeCircleSharp,
  cubeSharp,
  listCircleOutline,
} from "ionicons/icons";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import * as H from "history";
import { Bill } from "../../../entities";
import { refUserBillsFirebase } from "../../../config/firebase";
interface ContainerProps {
  history: H.History;
  currentUser: any;
}

const ListContainer: React.FC<ContainerProps> = ({ history, currentUser }) => {
  useIonViewDidLeave(() => {
    console.log("ionViewDidLeave event fired");
  });

  const [data, setdata] = useState<Array<Bill>>();
  const [fireData, setFireData] =  useState<any[]>();
  const [showModal, setShowModal] = useState(false);
  const [hideLoadBar, setHideLoadBar] = useState(false);
  const states = new Map<string, { icon: any; color: string; state: string }>();
  states.set("start", {
    icon: cubeSharp,
    color: "secondary",
    state: "Procesando",
  });
  states.set("prepare", {
    icon: listCircleOutline,
    color: "purple",
    state: "Alistado",
  });
  states.set("delivery", {
    icon: "assets/icons/deliveryTimeOutline.svg",
    color: "blue-hole",
    state: "Despachado",
  });
  states.set("finished", {
    icon: checkmarkCircleSharp,
    color: "green-light",
    state: "Recibido",
  });
  states.set("cancel", {
    icon: closeCircleSharp,
    color: "red-light",
    state: "Cancelado",
  });
  useEffect(() => {
    refUserBillsFirebase(currentUser._id).on("value", snapshot => {
        setFireData([]);
      const pendingData: any[] = [];
      snapshot.forEach(snap => {
        pendingData.push({code:snap.key,states:snap.val()});
      });
      setFireData(pendingData);
    });
  }, [currentUser._id]);
  useEffect(() => {
    
    async function fetchData() {
      setHideLoadBar(false);
      let pathUrl = `${config.BillsContext}?pageSize=15`;
      await HttpRequest(pathUrl, "GET", "", true)
        .then(async (resultado: any) => {
          setdata(resultado);
          setHideLoadBar(true);
        })
        .catch((err) => {
          setHideLoadBar(true);
          console.error(err);
       //   history.go(0);
        });
    }
    fetchData();
  }, [history,fireData]);

  return (
    <>
      {data
        ? data.map((bill: Bill, index) => {
            let billstate ;
            let startState;
            let total=bill.Total.toLocaleString();
            
    if (bill.enabled) {
      const fireStates = fireData?fireData.find(element =>element.code  === bill.code):null;
      if(fireStates&&fireStates.states){
      billstate = states.get(
        fireStates.states[fireStates.states.length - 1].state
      );
    startState= fireStates.states[fireStates.states.length - 1].start;
}
}else {
    startState= bill.states[bill.states.length - 1].start;
    billstate = states.get(
        bill.states[bill.states.length - 1].state
      );
}
            return (
              <IonCard key={index} id="card" onClick={async () => {}}>
                <IonToolbar>
        <IonTitle>Tus pedidos</IonTitle>
        </IonToolbar>
                <IonList>
                  <IonItem lines="none">
                    <IonAvatar
                      slot="start"
                      class="ion-align-self-start ion-align-self-center"
                    >
                      <IonIcon
                        size="large"
                        color={billstate ? billstate.color : "white"}
                        icon={billstate ? billstate.icon : null}
                      ></IonIcon>
                    </IonAvatar>
                    <IonText slot="start" color={"steel"}>
                      <p>
                        <strong>{billstate ? billstate.state : "..."}</strong>
                      </p>
                      <p>
                        <small>
                          {startState}
                        </small>
                      </p>
                    </IonText>
                    <IonText slot="end" class="ion-float-right ion-text-right">
                      <IonText color={"primary"}>
                        <p>Detalles</p>
                      </IonText>
                      <IonText>
                        <p>
                          $<strong>{total}</strong>
                        </p>
                      </IonText>
                    </IonText>
                  </IonItem>
                </IonList>
                <IonModal
                  onDidDismiss={(e) => setShowModal(false)}
                  isOpen={showModal}
                  animated={true}
                >
                  <IonContent>
                    <IonFab vertical="bottom" horizontal="start" slot="fixed">
                      <IonFabButton
                        onClick={() => setShowModal(false)}
                        routerLink="/home"
                      >
                        <IonIcon icon={arrowBackOutline} />
                      </IonFabButton>
                    </IonFab>
                  </IonContent>
                </IonModal>
              </IonCard>
            );
          })
        : null}
      <IonProgressBar
        hidden={hideLoadBar}
        type="indeterminate"
      ></IonProgressBar>
    </>
  );
};

export default ListContainer;
