import React, { useState } from 'react';
import { IonItem, IonIcon, IonLabel, IonCard, IonCardContent, IonAvatar, IonToggle, IonRow, IonGrid, IonCol, IonSearchbar } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
interface ContainerProps {
  inputs: Array<any>;
}

const DynamicList: React.FC<ContainerProps> = ({ inputs }) => {
  const [searchText, setSearchText] = useState('');
  if (inputs.length < 0) {
    return (<></>)
  }
  return (
    <>
      <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="always"></IonSearchbar>
      {inputs.map((input: any, index) => {

        return (

          <IonCard key={index} id='card' class="card-login">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonAvatar slot="start">
                        <IonIcon size="large" color='primary' src={personCircleOutline} />
                      </IonAvatar>
                      <IonLabel>
                        <h1><strong>T{input.blockNumber} {input.homeNumber}</strong></h1>
                        <h2> {input.firstName} {input.lastName}</h2>
                        <h3> {input.debt}</h3>
                        <p>
                          {input.email}<br />
                          {input.phone}<br />
                        </p>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonToggle checked={input.enabled} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>Points: {input.points}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Deuda:{input.debt}</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonItem hidden={true}>
                  <IonLabel>{input.documentId}</IonLabel>
                </IonItem>


              </IonGrid>
            </IonCardContent>
          </IonCard>



        )
      })}


    </>

  );
};

export default DynamicList;
