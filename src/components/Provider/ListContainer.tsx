import React, { useState } from "react";
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonText,
  IonModal,
  IonFab,
  IonFabButton,
  IonTitle,
  IonCardHeader,
  IonThumbnail,
  IonImg,
  IonContent,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import ListContainerProduct from "../Product/ListContainer";
import { HttpRequest } from "../../hooks/HttpRequest";
import config from "../../config";
interface ContainerProps {
  loaddata: boolean;
  inputs: Array<any>;
  currentUser: any;
}

const ListContainer: React.FC<ContainerProps> = ({
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

          {data.map((input: any, index) => {
            return (
              <IonCard key={index} id="card">
                <IonCardHeader color="primary">
                  <IonTitle>
                    <strong>{input.firstName}</strong>
                  </IonTitle>
                </IonCardHeader>
                <IonCardContent
                  onClick={async () => {
                    let pathUrl = `/${config.ProductContext}?providerId=${input._id}&pageSize=100`;
                    console.log(pathUrl);
                    await HttpRequest(pathUrl, "GET", "", true).then(
                      async (resultado: any) => {
                        setProductsArray(resultado);
                        setloadData(true);
                        setShowModal(true);
                      }
                    ).catch((err)=>{
                      console.error(err);
                    });
                  }}
                >
                  <IonItem>
                    <IonThumbnail class="productImage" slot="start">
                      <IonImg src={input.urlImage ? input.urlImage : "https://vecino.s3.amazonaws.com/1587059420099.jpeg"} />
                    </IonThumbnail>
                    <IonLabel>
                      <h1>{input ? input.category : ""}</h1>
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
                <IonModal 
                onDidDismiss={(e) => setShowModal(false)}
                  isOpen={showModal}
                  animated={true}
                >
                  <IonContent>
                    <ListContainerProduct
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
          })}
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
    console.log(e);
    throw e;
  }
};

export default ListContainer;
