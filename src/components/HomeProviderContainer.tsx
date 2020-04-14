import React, { useCallback, useState, useEffect, useRef } from 'react';
import { IonCard, IonProgressBar, IonAlert, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/react';
import { HttpRequest } from '../hooks/HttpRequest';
import ListContainer from './Product/ListContainer';
import { Storages } from '../hooks/Storage';
import {  barChartSharp, pricetagsSharp } from 'ionicons/icons';

import ChartsContainer from './Dashboard/ChartsContainer';

interface ContainerProps {
  history: any;
  currentUser:any;
}

const HomeProviderContainer: React.FC<ContainerProps> = ({ history,currentUser }) => {
  const [hiddenBar, setHiddenBar] = useState(false);
  const [loadData, setloadData] = useState(false);
  const user:any = useRef<any>(currentUser);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState('');
  const [productsArray, setProductsArray] = useState<any>([{}]);
  const [segmentValue, setSegmentValue] = useState<any>("product");
  const httpRequest = useCallback(
    async () => {
      try {
        console.log(user.current._id);
        let pathurl;
        if (segmentValue === 'product') {
          pathurl = `/product?providerId=${user.current._id}`;
        } else {
          pathurl = `/parkingspace/${segmentValue}`;
        }
        console.log(pathurl);
        await HttpRequest(pathurl, 'GET', '', true)
          .then(async (resultado: any) => {
            try {
              if (resultado.status) {
                setMessage('No se encontro ningun');
                setShowAlert1(true);
              }
            } catch (e) {
              console.error(e);
            }
            console.log(resultado);
            if (Array.isArray(resultado)) {
              setProductsArray(resultado);
            }
            setHiddenBar(true);
            
            setloadData(true);
          })
          .catch(error => {
            if (error.message.includes('404')) {
              setHiddenBar(true);
              setloadData(true);
            } else {
              throw error;
            }
          });
      } catch (e) {
        console.log(e.message)
        const { removeItem } = await Storages();
        await removeItem('token');
        await removeItem('user');
        setMessage(e.message);
        setShowAlert1(true);
        console.error("HomeAdminPageContainer: " + e);
        setHiddenBar(true);
        history.push(
          '/login'
        )
      }
    },
    [history, segmentValue],
  );

  useEffect(() => {
    setHiddenBar(false);
    setloadData(false);
    setProductsArray([{}]);
    httpRequest();
  }, [httpRequest, segmentValue])
 
  return (
    <>
       <IonCard class="card-login">
          <IonToolbar>
            <IonSegment onIonChange={(e) => {
              setSegmentValue(e.detail.value);
            }
            }  value={segmentValue}>
              <IonSegmentButton value="dashboard" >
                <IonIcon class='icons-segment' size='medium' icon={barChartSharp} />
              </IonSegmentButton>
              <IonSegmentButton value="product" >
                <IonIcon class='icons-segment' size='medium' icon={pricetagsSharp} />
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          {segmentValue
            ? <>{
            segmentValue==='product' && hiddenBar ? (<ListContainer loaddata={loadData} inputs={productsArray} currentUser={currentUser}></ListContainer>)
            :segmentValue==='dashboard'?(<ChartsContainer ></ChartsContainer>)
            :null
          }</>
            : <></>}
          <IonProgressBar hidden={hiddenBar} type="indeterminate"></IonProgressBar><br />
        </IonCard>

        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(true)}
          header={'Advertencia'}
          subHeader={'se produjo un error debido a que:'}
          message={message}
          buttons={['OK']}
        />
    </>
  );
};

export default HomeProviderContainer;