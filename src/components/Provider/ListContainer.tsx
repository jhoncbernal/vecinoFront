import React, { useState } from "react";
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
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import ListContainerProduct from "../Product/ListContainer";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
import * as H from 'history';
interface ContainerProps {
  history:H.History;
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
  const [data, setdata] = useState(inputs);
  const [showModal, setShowModal] = useState(false);
  const [productsArray, setProductsArray] = useState<any>([{}]);
  const [loadData, setloadData] = useState(false);


  try {
    if (inputs.length > 0) {
      return (
        <>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => {
              setdata(inputs);
              setSearchText(e.detail.value!);

              let newData = inputs.filter((item) => {
                let itemData = `${item.productType.toUpperCase()} ${item.productName.toUpperCase()} 
              ${item.features.toUpperCase()}
              ${item.price.toString().toUpperCase()}
              ${item.totalAmount.toString().toUpperCase()}
              ${item.measureType.toUpperCase()}`;
                if (item.promotionPrice) {
                  itemData =
                    itemData +
                    `${item.promotionPrice.toString().toUpperCase()}`;
                }
                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
              });
              setdata(newData);
            }}
            showCancelButton="always"
            hidden={!loaddata}
          ></IonSearchbar>

          {data ?data.map((input: any, index) => {
            return (
              <IonCard key={index} id="card">
                <IonCardHeader color="primary">

                    <IonText>
                    <strong>{input.firstName?.toUpperCase()}</strong></IonText>

                </IonCardHeader>
                <IonCardContent
                  onClick={async () => {
                    let pathUrl = `/${config.ProductContext}?providerId=${input._id}&pageSize=100`;
                    await HttpRequest(pathUrl, "GET", "", true).then(
                      async (resultado: any) => {
                        setProductsArray(resultado);
                        setloadData(true);
                        setShowModal(true);
                      }
                    ).catch((err)=>{
                      console.error(err);
                      history.go(0);
                    });
                  }}
                >
                  <IonItem lines="none">
                    <IonThumbnail class="productImage ion-align-items-start ion-align-self-center" slot="start">
                      <IonImg src={input.urlImage ? input.urlImage : null} />
                    </IonThumbnail>
                      <IonText color={'steel'} class="ion-align-self-center ion-align-items-start">
                      <h1>{input ? input.category?.charAt(0).toUpperCase() + input.category?.slice(1) : null}</h1>
                      </IonText>
                  </IonItem>
                </IonCardContent>
                <IonModal 
                onDidDismiss={(e) => setShowModal(false)}
                  isOpen={showModal}
                  animated={true}
                >
                  <IonContent>
                    <ListContainerProduct
                    history={history}
                      loaddata={loadData}
                      inputs={productsArray}
                      currentUser={currentUser}
                      provider={input}
                    ></ListContainerProduct>
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
          }):null}
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
