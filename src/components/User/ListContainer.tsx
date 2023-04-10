import React, { useState } from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonRow,
  IonGrid,
  IonCol,
  IonSearchbar,
  IonText,
  IonModal,
  IonFab,
  IonFabButton,
  IonTitle,
  IonCardHeader,
} from "@ionic/react";
import {
  arrowBackOutline,
  personOutline,
  warningOutline,
} from "ionicons/icons";
import UpdateUser from "./UpdateContainer";
import * as H from "history";
import { User } from "../../entities";
import config from "../../config";
interface ContainerProps {
  currentUser: User;
  loaddata: boolean;
  inputs: Array<any>;
  history: H.History;
}

const ListContainer: React.FC<ContainerProps> = ({
  loaddata,
  inputs,
  history,
  currentUser,
}) => {
  const dataModalIni: any = {};
  const [searchText, setSearchText] = useState("");
  const [data, setdata] = useState(inputs);
  const [dataModal, setdataModal] = useState(dataModalIni);
  const [showModal, setShowModal] = useState(false);
  try {
    if (inputs.length > 0) {
      return (
        <>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => {
              setdata(inputs);
              setSearchText(e.detail.value!);

              const newData = inputs.filter((item) => {
                const itemData = `T${item?.propertyInfo?.sectionNumber
                  .toString()
                  .toUpperCase()} ${item.propertyInfo.propertyNumber.toString().toUpperCase()} 
    ${item.firstName.toUpperCase()}${item.lastName.toUpperCase()}
    ${item.email.toUpperCase()}
    ${item.phone.toString().toUpperCase()}
    ${item?.documentId?.toString().toUpperCase()}`;
                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
              });
              setdata(newData);
            }}
            // e => setSearchText(e.detail.value!)}
            showCancelButton="always"
            hidden={!loaddata}
          ></IonSearchbar>

          {data.map((input: User, index) => {

            const debt = input.debt ? input.debt.toLocaleString() : 0;
            
            return (
              <IonCard key={index} id="card">
                <IonCardHeader color={Number(debt) > 0 ? "danger" : "primary"}>
                  <IonTitle>
                    <strong>
                      T{input?.propertyInfo?.sectionNumber}{" "}
                      {input?.propertyInfo?.propertyNumber}
                      {Number(debt) > 0 ? "  ¡Usuario en mora!" : ""}
                    </strong>
                  </IonTitle>
                </IonCardHeader>
                <IonCardContent
                  onClick={() => {
                    if (
                      !currentUser.roles?.includes(config.RolSecurityAccess)
                    ) {
                      setShowModal(true);
                      setdataModal(input);
                    }
                  }}
                >
                  <IonGrid>
                    <IonItem lines="none">
                      <IonLabel>Estado del usuario:</IonLabel>
                      <IonText color={"steel"}>
                        {input.enabled ? "Activo" : "Inactivo"}
                      </IonText>
                    </IonItem>
                    <IonRow>
                      <IonCol>
                        <IonItem lines="none">
                          <IonAvatar slot="start">
                            <IonIcon
                              class="icon-avatar"
                              size="large"
                              color={Number(debt) > 0 ? "danger" : "primary"}
                              src={
                                Number(debt) > 0
                                  ? warningOutline
                                  : personOutline
                              }
                            />
                          </IonAvatar>
                          <IonLabel>
                            <h2>
                              {input ? input.firstName : ""}
                              {input ? input.lastName : ""}
                            </h2>
                            <h3>{input ? input.email : ""}</h3>
                            <p>{input ? input.phone : ""}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem lines="none">
                          <IonLabel>
                            <h2>{`Points:    ${input.points}`}</h2>
                            <h3>
                              {"Deuda: "} <strong>${input.debt}</strong>
                            </h3>
                            <p>{`${
                              input.isOwner
                                ? "Propietario"
                                : "No es propietario"
                            }`}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonItem hidden={true}>
                      <IonLabel>{input.documentId}</IonLabel>
                    </IonItem>
                    <IonItem hidden={true}>
                      <IonLabel>{input._id}</IonLabel>
                    </IonItem>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            );
          })}
           <IonModal
                  backdropDismiss={false}
                  isOpen={showModal}
                  animated={true}
                >
                  <UpdateUser
                    currentUser={currentUser}
                    dataModal={dataModal}
                    triggerChange={(response: boolean) => {
                      response ? history.go(0) : console.error(response);
                    }}
                  ></UpdateUser>
                  <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton
                      onClick={() => {setShowModal(false);}}
                    >
                      <IonIcon icon={arrowBackOutline} />
                    </IonFabButton>
                  </IonFab>
                </IonModal>
        </>
      );
    } else {
      return (
        <>
          <h1>
            <IonText color="primary">Sin conexion</IonText>
          </h1>
        </>
      );
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default ListContainer;
