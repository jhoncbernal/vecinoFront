import React from 'react';
import { IonPage, IonContent, IonRefresherContent, IonRefresher, IonTitle, IonImg } from '@ionic/react';
import HomeAdminPageContainer from '../components/HomeAdminContainer';
import HomeProviderContainer from '../components/HomeProviderContainer';
import FloatingButtonsMenuContainer from '../components/FloatingButtonsMenuContainer';
import { RefresherEventDetail } from '@ionic/core';
import { Storages } from '../hooks/Storage';
import HomeUserContainer from '../components/HomeUserContainer';

export class Home extends React.Component<{ history: any },
{
  currentUser: any}> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        currentUser: '',
      }
      this.preValues();
    }
    async preValues() {
      try {
        const { getObject } = await Storages();
        const user: any = await getObject('user');
        if (!user) {
          const err = new Error();
          err.message = 'sus credenciales vencieron';
          throw err;
        }
        else {
          this.setState({'currentUser':user.obj})
        }
      } catch (e) {
        console.error(e);
      }
    }
  
     doRefresh(event: CustomEvent<RefresherEventDetail>) {
      console.log('Begin async operation');
    
      setTimeout(() => {
        console.log('Async operation has ended');
        this.props.history.go(0);
        event.detail.complete();
      }, 2000);
    }

  render() {
    const { history } = this.props;
    
    return (
       <IonPage>
      <IonContent  class="bg-image">
      <IonTitle> <IonImg class='img' src={'/assets/img/IconLogo.png'} /></IonTitle>
        {this.state.currentUser.firstName
          ? <IonTitle color='primary'>{`${this.state.currentUser.firstName}`}</IonTitle>
          : <></>}
      <FloatingButtonsMenuContainer history={history}></FloatingButtonsMenuContainer>
    {this.state.currentUser.roles?(
    this.state.currentUser.roles.includes('ROLE_ADMINISTRATION_ACCESS')
        ?(<HomeAdminPageContainer history={history} ></HomeAdminPageContainer>)
    :this.state.currentUser.roles.includes('ROLE_PROVIDER_ACCESS') 
        ?(<HomeProviderContainer history={history} currentUser={this.state.currentUser} ></HomeProviderContainer>)
        :<HomeUserContainer history={history} currentUser={this.state.currentUser}></HomeUserContainer>):null}
      <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
        <IonRefresherContent color='primary'
          pullingIcon="arrow-dropdown"
          pullingText="Deslice para actualizar"
          refreshingSpinner="circles"
          refreshingText="Actualizando...">
        </IonRefresherContent>
      </IonRefresher>
      </IonContent>
    </IonPage>
    );
  }
}
export default Home;