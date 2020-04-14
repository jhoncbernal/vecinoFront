import React, { useState, useCallback, useEffect } from 'react';
import { IonItem, IonIcon, IonLabel, IonCard, IonCardContent, IonRow, IonGrid, IonCol, IonSearchbar, IonText, IonModal, IonFab, IonFabButton, IonTitle, IonCardHeader, IonThumbnail, IonImg, IonButton, IonInput, } from '@ionic/react';
import { arrowBackOutline, addSharp, removeSharp } from 'ionicons/icons';
import UpdateProvider from './UpdateContainer';
interface ContainerProps {
  loaddata: boolean;
  inputs: Array<any>;
  currentUser: any;
}

const ListContainer: React.FC<ContainerProps> = ({ loaddata, inputs, currentUser }) => {
  let productCart: any = {};
  const [searchText, setSearchText] = useState('');
  const [data, setdata] = useState(inputs);
  const [dataModal, setdataModal] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleProductCart = useCallback(
    (property: string,operation:string) => {
      try {
        if (productCart[`${property}`] >= 0&&operation==='Add') {
          productCart[`${property}`]++;
        }else if (productCart[`${property}`] > 0&&operation==='Less') {
          productCart[`${property}`]--;
        } else {
          productCart[`${property}`] = 0;
        }
        console.log(productCart)
      } catch (e) {
        console.error(e);
      }
    },
    [productCart],
  );
  useEffect(() => {
    console.log(productCart)
  }, [productCart])
  try {
    if (inputs.length > 0) {

      return (
        <>

          <IonSearchbar value={searchText} onIonChange={(e) => {
            setdata(inputs);
            setSearchText(e.detail.value!);

            let newData = inputs.filter(item => {
              let itemData = `${item.productType.toUpperCase()} ${item.productName.toUpperCase()} 
              ${item.features.toUpperCase()}
              ${item.price.toString().toUpperCase()}
              ${item.totalAmount.toString().toUpperCase()}
              ${item.measureType.toUpperCase()}`;
              if (item.promotionPrice) {
                itemData = itemData + `${item.documentId.toString().toUpperCase()}`;
              }
              const textData = searchText.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            setdata(newData);
          }}





            // e => setSearchText(e.detail.value!)}
            showCancelButton="always" hidden={!loaddata}></IonSearchbar>

          {data.map((input: any, index) => {
            return (

              <IonCard key={index} id='card'>
                <IonCardHeader color={input.totalAmount <= 0 ? ('danger') : input.totalAmount < 10 ? ('warning') : 'primary'}>
                  <IonTitle ><strong> {input.totalAmount <= 0 ? ('  Agotado') : input.totalAmount < 10 ? ('¡Quedan Pocas Unidades!') : ''}</strong></IonTitle>
                </IonCardHeader>
                <IonCardContent onClick={() => {
                  if (currentUser) {
                    if (currentUser.roles.includes('ROLE_PROVIDER_ACCESS')) {
                      setShowModal(true);
                      setdataModal(input)
                    }
                  }

                }}>
                  <IonGrid>

                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonThumbnail class='productImage' slot="start">
                            <IonImg src={input.urlImage} />
                          </IonThumbnail>
                          <IonLabel>
                            <h2>{input ? input.productType : ''} {input ? input.productName : ''} </h2>
                            <h3><strong>$ {input ? (input.price) : input.promotionPrice ? (<s>{input.price}</s>) : ''}</strong></h3>
                            {input ? (input.promotionPrice ? (<h3 color="dark">Precio de Oferta: <strong>$ {input.promotionPrice}</strong></h3>) : null) : null}
                            <p>{input ? input.features : ''}</p>
                          </IonLabel>
                        </IonItem>
                        <IonItem>
                          <IonButton onClick={()=>{handleProductCart(input._id,'Less')}}>
                            <IonIcon slot="icon-only" icon={removeSharp} />
                          </IonButton>
                          <IonInput value={productCart[`${input._id}`]}></IonInput>
                          <IonButton onClick={()=>{if(input.totalAmount<=productCart[`${input._id}`]){handleProductCart(input._id,'Add')}}}>
                            <IonIcon slot="icon-only" icon={addSharp} />
                          </IonButton>
                        </IonItem>
                      </IonCol>
                      <IonCol hidden={currentUser.roles.includes('ROLE_PROVIDER_ACCESS') ? false : true}>
                        <IonItem>
                          <IonLabel>
                            <h2> </h2>
                            <h2>{`Total:    ${input.totalAmount}${input.measureType}`}</h2>
                            <h3>{`Estado: ${input.enabled ? 'Habilitado' : 'Inhabilitado'}`}</h3>
                            <p>{`Codigo de Producto:  ${input.code}`}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                  </IonGrid>
                </IonCardContent>
                <IonModal backdropDismiss={false} isOpen={showModal} animated={true}  >
                  <UpdateProvider dataModal={dataModal}></UpdateProvider>
                  <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={() => setShowModal(false)} routerLink="/home"><IonIcon icon={arrowBackOutline} /></IonFabButton>
                  </IonFab>
                </IonModal>
              </IonCard>
            )
          })}


        </>

      );
    } else {
      return (<><h1><IonText color='primary'>Sin conexion</IonText></h1></>)
    }
  } catch (e) { console.log(e); throw e }
};

export default ListContainer;
