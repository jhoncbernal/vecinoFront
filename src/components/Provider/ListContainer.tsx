import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonIcon,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonText,
  IonModal,
  IonFab,
  IonFabButton,
  IonCardHeader,
  IonThumbnail,
  IonImg,
  IonContent,
  IonLoading,
  IonToolbar,
  IonTitle,
  IonSkeletonText,
  IonLabel,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import ListContainerProduct from "../Product/ListContainer";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import * as H from "history";
import {  ProviderListItem } from "../../entities";
interface ContainerProps {
  history: H.History;
  loaddata: boolean;
  inputs: Array<any>;
  currentUser: any;
}

const ListContainer: React.FC<ContainerProps> = ({
  history,
  loaddata,
  inputs,
  currentUser,
}) => {
  const [searchText, setSearchText] = useState("");
  const [data, setdata] = useState();
  const [showModal, setShowModal] = useState(false);
  const [productsArray, setProductsArray] = useState<any>([{}]);
  const [loadData, setloadData] = useState(false);
  const [provider, setProvider] = useState<ProviderListItem>();

  useEffect(() => {
    setdata(inputs);
  }, [inputs]);
  try {
    if (inputs && inputs.length > 0) {
      return (
        <>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => {
              setdata(inputs);
              setSearchText(e.detail.value!);

              let newData = inputs.filter((item) => {
                let itemData = `${item.category.toUpperCase()} ${item.firstName.toUpperCase()}`;

                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
              });
              setdata(newData);
            }}
            showCancelButton="always"
            hidden={!loaddata}
          ></IonSearchbar>

          {data
            ? data.map((input: ProviderListItem, index: number) => {
                return (
                  <IonCard key={index} id="card" >
                    <IonCardHeader color="primary">
                      <IonText>
                        <strong>{input.firstName?.toUpperCase()}</strong>
                      </IonText>
                    </IonCardHeader>
                    <IonCardContent
                      onClick={async (e) => {
                        e.preventDefault();
                        let pathUrl = `/${config.ProductContext}?providerId=${input._id}&pageSize=100`;
                        await HttpRequest(pathUrl, "GET", "", true)
                          .then(async (resultado: any) => {
                            setProductsArray(resultado);
                            setProvider(input);
                            setloadData(true);
                            setShowModal(true);
                          })
                          .catch((err) => {
                            console.error(err);
                            history.go(0);
                          });
                      }}
                    >
                      <IonItem lines="none">
                        <IonThumbnail
                          class="productImage ion-align-items-start ion-align-self-center"
                          slot="start"
                        >
                          <IonImg
                            src={input.urlImage }
                          />
                        </IonThumbnail>
                        <IonText
                          color={"steel"}
                          class="ion-align-self-center ion-align-items-start"
                        >
                          <h1>
                            {input
                              ? input.category?.charAt(0).toUpperCase() +
                                input.category?.slice(1)
                              : null}
                          </h1>
                        </IonText>
                      </IonItem>
                    </IonCardContent>
                  
                  </IonCard>
                );
              })
            : null}
              <IonModal
                      onDidDismiss={(e) => setShowModal(false)}
                      isOpen={showModal}
                      animated={true}
                      id="productModal"
                    >
                      <IonContent>
                        <ListContainerProduct
                          history={history}
                          loaddata={loadData}
                          inputs={productsArray}
                          currentUser={currentUser}
                          provider={provider}
                        ></ListContainerProduct>
                        <IonFab
                          vertical="bottom"
                          horizontal="start"
                          slot="fixed"
                        >
                          <IonFabButton
                            onClick={() => setShowModal(false)}
                            routerLink="/home"
                          >
                            <IonIcon icon={arrowBackOutline} />
                          </IonFabButton>
                        </IonFab>
                      </IonContent>
                    </IonModal>
        </>
      );
    } else {
      return (
        <>
          <IonLoading
            isOpen={!loadData}
            spinner="bubbles"
            onDidDismiss={() => setloadData(true)}
            message={"Por favor espere"}
            duration={5000}
          />
          <IonToolbar><IonTitle class='ion-text-center'>Verifique su conexion a internet o recarge la pagina</IonTitle>
          </IonToolbar>
          <IonCard>
            <IonCardHeader hidden={!loadData}>
            </IonCardHeader>
            <IonCardContent>
            <IonItem>
              <IonThumbnail slot="start">
                <IonSkeletonText animated />
              </IonThumbnail>
              <IonLabel>
                <h3>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </h3>
                <p>
                  <IonSkeletonText animated style={{ width: '80%' }} />
                </p>
                <p>
                  <IonSkeletonText animated style={{ width: '60%' }} />
                </p>
              </IonLabel>
            </IonItem>
            </IonCardContent>
          </IonCard>
        </>
      );
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default ListContainer;
