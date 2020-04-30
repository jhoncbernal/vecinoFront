import React, { useCallback, useState, useEffect } from "react";
import {
  IonCard,
  IonProgressBar,
  IonAlert,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from "@ionic/react";
import { HttpRequest } from "../hooks/HttpRequest";
import ListContainer from "./User/ListContainer";
import ParkingListContainer from "./ParkingSpace/ListContainer";
import { Storages } from "../hooks/Storage";
import {
  carSportSharp,
  bicycleSharp,
  peopleSharp,
  barChartSharp,
} from "ionicons/icons";

import ChartsContainer from "./Dashboard/ChartsContainer";
import config from "../config";
import * as H from 'history';
interface ContainerProps {
  history: H.History;
}
const HomeAdminPageContainer: React.FC<ContainerProps> = ({ history }) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setloadData] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState("");
  const [usersArray, setUsersArray] = useState<any>([{}]);
  const [vehiclesArray, setVehiclesArray] = useState<any>([{}]);
  const [segmentValue, setSegmentValue] = useState<any>("user");
  const httpRequest = useCallback(async () => {
    try {
      let pathUrl;
      if (segmentValue === "user") {
        pathUrl = `${config.UserContext}`;
      } else {
        pathUrl = `${config.ParkingSpaceContext}/${segmentValue}`;
      }
      await HttpRequest(pathUrl, "GET", "", true)
        .then(async (resultado: any) => {
          try {
            if (resultado.status) {
              setMessage("No se encontro ningun");
              setShowAlert1(true);
            }
          } catch (e) {
            console.error(e);
          }
          if (Array.isArray(resultado)) {
            setUsersArray(resultado);
          } else {
            setVehiclesArray(resultado.positions);
          }
          setHiddenBar(true);
          const { getObject } = await Storages();
          const user: any = await getObject("user");
          if (!user) {
            const err = new Error();
            err.message = "sus credenciales vencieron";
            throw err;
          } else {
            //setCurrentUser(user.obj);
          }
          setloadData(true);
        })
        .catch((error) => {
          if (error.message.includes("404")) {
            setHiddenBar(true);
            setloadData(true);
          } else {
            throw error;
          }
        });
    } catch (e) {
      const { removeItem } = await Storages();
      await removeItem("token");
      await removeItem("user");
      setMessage(e.message);
      setShowAlert1(true);
      console.error("HomeAdminPageContainer: " + e);
      setHiddenBar(true);
      history.push("/login");
    }
  }, [history, segmentValue]);

  useEffect(() => {
    setHiddenBar(false);
    setloadData(false);
    setUsersArray([{}]);
    setVehiclesArray([{}]);
    httpRequest();
  }, [httpRequest, segmentValue]);

  return (
    <>
      <IonCard class="home-card-center">
        <IonToolbar>
          <IonSegment
            onIonChange={(e) => {
              setSegmentValue(e.detail.value);
            }}
            value={segmentValue}
          >
            <IonSegmentButton value="dashboard">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={barChartSharp}
              />
            </IonSegmentButton>
            <IonSegmentButton value="user">
              <IonIcon class="icons-segment" size="medium" icon={peopleSharp} />
            </IonSegmentButton>
            <IonSegmentButton value="Cars">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={carSportSharp}
              />
            </IonSegmentButton>
            <IonSegmentButton value="Motorcycles">
              <IonIcon
                class="icons-segment"
                size="medium"
                src={"assets/icons/motorcycleSharp.svg"}
              />
            </IonSegmentButton>
            <IonSegmentButton value="Bikes">
              <IonIcon
                class="icons-segment"
                size="medium"
                icon={bicycleSharp}
              />
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        {segmentValue ? (
          <>
            {segmentValue === "user" && hiddenBar ? (
              <ListContainer
                loaddata={loadData}
                inputs={usersArray}
              ></ListContainer>
            ) : segmentValue === "dashboard" ? (
              <ChartsContainer></ChartsContainer>
            ) : segmentValue === "Cars" ? (
              <ParkingListContainer
                history={history}
                parkingType={segmentValue}
                loaddata={loadData}
                inputs={vehiclesArray}
              ></ParkingListContainer>
            ) :  segmentValue === "Motorcycles" ? (
              <ParkingListContainer
                history={history}
                parkingType={segmentValue}
                loaddata={loadData}
                inputs={vehiclesArray}
              ></ParkingListContainer>
            ): segmentValue === "Bikes" ? (
              <ParkingListContainer
                history={history}
                parkingType={segmentValue}
                loaddata={loadData}
                inputs={vehiclesArray}
              ></ParkingListContainer>
            ):null}
          </>
        ) : (
          <></>
        )}
        <IonProgressBar
          hidden={hiddenBar}
          type="indeterminate"
        ></IonProgressBar>
        <br />
      </IonCard>

      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(true)}
        header={"Advertencia"}
        subHeader={"se produjo un error debido a que:"}
        message={message}
        buttons={["OK"]}
      />
    </>
  );
};

export default HomeAdminPageContainer;
