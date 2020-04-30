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
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import * as H from "history";
import { Bill } from "../../../entities";
import { refUserBillsFirebase } from "../../../config/firebase";
import { StatesDictionary } from "../../../hooks/OrderStates";
import DetailsOrder from "./DetailsOrder";
interface ContainerProps {
  history: H.History;
  currentUser: any;
}

const ListContainer: React.FC<ContainerProps> = ({ history, currentUser }) => {
  useIonViewDidLeave(() => {
    console.log("ionViewDidLeave event fired");
  });

  const [data, setdata] = useState<Array<Bill>>();
  const [fireData, setFireData] = useState<any[]>();
  const [showModal, setShowModal] = useState(false);
  const [billSelected, setBillSelected] = useState<Bill>();
  const [hideLoadBar, setHideLoadBar] = useState(false);
  const states = StatesDictionary().states;
  useEffect(() => {
    refUserBillsFirebase(currentUser._id).on("value", (snapshot) => {
      setFireData([]);
      const pendingData: any[] = [];
      snapshot.forEach((snap) => {
        pendingData.push({ code: snap.key, states: snap.val() });
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
  }, [history, fireData]);

  return (
    <>
      <IonToolbar>
        <IonTitle>Tus pedidos</IonTitle>
      </IonToolbar>
      {data
        ? data.map((bill: Bill, index) => {
            let billstate;
            let startState;
            let total = bill.Total.toLocaleString();

            if (bill.enabled) {
              const fireStates = fireData
                ? fireData.find((element) => element.code === bill.code)
                : null;
              if (fireStates && fireStates.states) {
                billstate = states.get(
                  fireStates.states[fireStates.states.length - 1].state
                );
                startState =
                  fireStates.states[fireStates.states.length - 1].start;
              }
            } else {
              startState = bill.states[bill.states.length - 1].start;
              billstate = states.get(bill.states[bill.states.length - 1].state);
            }
            return (
                <IonCard key={index}  onClick={async () => {setBillSelected(bill);setShowModal(true)}}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size-xs="7" size-md="6">
                        <IonItem lines='none'>
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
                              <strong>
                                {billstate ? billstate.state : "..."}
                             </strong>
                            </p>
                            <p>
                              <small>{startState}</small>
                            </p>
                          </IonText>
                        </IonItem>
                      </IonCol>
                      <IonCol size-xs="5" size-md="6">
                        <IonItem lines='none'>
                          <IonText
                            slot="end"
                            class="ion-float-right"
                          >
                            <IonText color={"secondary"}>
                              <p><small>Detalles</small></p>
                            </IonText>
                            <IonText>
                              <p>
                                $<strong><small>{total}</small></strong>
                              </p>
                            </IonText>
                          </IonText>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
            );
          })
        : null}
        <IonModal
                  onDidDismiss={(e) => setShowModal(false)}
                  isOpen={showModal}
                  animated={true}
                >
                  <IonContent>
                    <DetailsOrder history={history} bill={billSelected} ></DetailsOrder>
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
      <IonProgressBar
        hidden={hideLoadBar}
        type="indeterminate"
      ></IonProgressBar>
    </>
  );
};

export default ListContainer;
