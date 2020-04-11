import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import HomeAdminPageContainer from '../components/HomeAdminContainer';
import HomePage from './HomePage';

export class Home extends React.Component<{ history: any },
  {}> {


  render() {
    const { history } = this.props;
    return (
       <IonPage>
      <IonContent>
      <HomeAdminPageContainer history={history} ></HomeAdminPageContainer>
      <HomePage history={history}></HomePage>
      </IonContent>
    </IonPage>
    );
  }
}
export default Home;