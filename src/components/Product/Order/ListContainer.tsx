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
  IonAvatar,
  IonProgressBar,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { HttpRequest } from "../../../hooks/HttpRequest";
import config from "../../../config";
import * as H from "history";
import { Bill } from "../../../entities";
import { StatesDictionary } from "../../../hooks/OrderStates";
import DetailsOrder from "./DetailsOrder";
interface ContainerProps {
  history: H.History;
  fireData: any;
}

const ListContainer: React.FC<ContainerProps> = ({ history,fireData }) => {


  const [data, setdata] = useState<Array<Bill>>();
  const [showModal, setShowModal] = useState(false);
  const [billSelected, setBillSelected] = useState<Bill>();
  const [statesSelected, setSetStatesSelected] = useState<Array<{state: string;start: string}>>();
  const [hideLoadBar, setHideLoadBar] = useState(false);
  const states = StatesDictionary().states;
  
  useEffect(() => {
    async function fetchData() {
      setHideLoadBar(false);
      const pathUrl = `${config.BillsContext}?pageSize=15`;
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
            let ActualState: any;
            const total = bill.Total.toLocaleString();

            if (bill.enabled) {
              const fireStates = fireData
                ? fireData.find((element: any) => element.code === bill.code)
                : null;
              if (fireStates && fireStates.states) {
                billstate = states.get(
                  fireStates.states[fireStates.states.length - 1].state
                );
                startState =
                  fireStates.states[fireStates.states.length - 1].start;
              }
              if(fireStates){
              ActualState=fireStates.states;
            }
            } else {
              if(bill.states){
              ActualState=bill.states;}
              startState = bill.states[bill.states.length - 1].start;
              billstate = states.get(bill.states[bill.states.length - 1].state);
            }
            return (
                <IonCard key={index}  onClick={async () => {setBillSelected(bill);setShowModal(true);setSetStatesSelected(ActualState);}}>
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
        : <IonCard>
          <IonTitle class="ion-text-center ion-margin-top">
          <strong>!No tienes ningun pedido!</strong>
          </IonTitle>
            <IonText>
           
              <p> Encuentra los que necesecitas en la seccion tiendas.</p>
            </IonText>
         
        <IonImg class="justImage " src={"/assets/img/emptyCart.png"} />
      </IonCard>}
        <IonModal
                  onDidDismiss={() => setShowModal(false)}
                  isOpen={showModal}
                  animated={true}
                >
                  <IonContent>
                    <DetailsOrder history={history} bill={billSelected} fireData={statesSelected}></DetailsOrder>
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
