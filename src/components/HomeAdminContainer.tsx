import React from 'react';
import { IonContent, IonImg, IonCard, IonProgressBar, IonAlert, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonTitle } from '@ionic/react';
import { HttpRequest } from '../hooks/HttpRequest';
import DynamicList from './User/ListContainer';
import { Storages } from '../hooks/Storage';
import { carSportSharp, bicycleSharp, peopleSharp } from 'ionicons/icons';
export class DynamicListPage extends React.Component<{ history: any }, {
  usersArray: Array<any>, hiddenbar: boolean, showAlert1: boolean, message: string, currentUser: any
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      usersArray: [], hiddenbar: false, showAlert1: false, message: '', currentUser: ''
    }

    this.request();
  }

  async request() {
    try {
      let pathurl = `/user`;
      await HttpRequest(pathurl, 'GET', '',true)
      .catch(error =>  {throw error})
      .then(async(resultado: any) => {
        console.log(resultado);
      this.setState({ 'usersArray': resultado });      
      this.setState({ 'hiddenbar': true });
      const { getObject } = await Storages();
      const user: any = await getObject('user');
      if (!user) {
        const err = new Error();
        err.message = 'sus credenciales vencieron';
        throw err;
      }
      else{
        this.setState({'currentUser':user.obj})
      }
      });

    } catch (e) {
      console.log(e.message)
      const { removeItem } = await Storages();
      await removeItem('token');
      await removeItem('user');
      this.setState({ 'message': e.message });
      this.setState({ 'showAlert1': true });
      console.error("DynamicListPage: " + e);
      this.setState({ 'hiddenbar': true })
      this.props.history.push(
        '/login'
      )
    }
  }


  render() {
    return (

      <>
        <IonToolbar><IonTitle> <IonImg class='img' src={'/assets/img/IconLogo.png'} /></IonTitle>
          <IonTitle color='primary'>{`${this.state.currentUser.firstName}`}</IonTitle>
        </IonToolbar>
        <IonToolbar >


        </IonToolbar>
        <IonContent class="bg-image">


          <IonCard class="card-login">
            <IonToolbar>
              <IonSegment value="Users" onIonChange={e => console.log('Segment selected', e.detail.value)}>
                <IonSegmentButton value="Users" >
                  <IonIcon class='icons-segment' size='medium' icon={peopleSharp} />
                </IonSegmentButton>
                <IonSegmentButton value="Cars">
                  <IonIcon class='icons-segment' size='medium' icon={carSportSharp} />
                </IonSegmentButton>
                <IonSegmentButton value="Motorcycles">
                  <IonIcon class='icons-segment' size='medium' src={'assets/icons/Helmet.svg'} />
                </IonSegmentButton>
                <IonSegmentButton value="Bikes">
                  <IonIcon class='icons-segment' size='medium' icon={bicycleSharp} />
                </IonSegmentButton>
              </IonSegment>
            </IonToolbar>
            <DynamicList inputs={this.state.usersArray}></DynamicList>
            <IonProgressBar hidden={this.state.hiddenbar} type="indeterminate"></IonProgressBar><br />
          </IonCard>
          <IonAlert
            isOpen={this.state.showAlert1}
            onDidDismiss={() => this.setState({ 'showAlert1': true })}
            header={'Advertencia'}
            subHeader={'se produjo un error debido a que:'}
            message={this.state.message}
            buttons={['OK']}
          />


        </IonContent>
      </>
    );
  };
}
export default DynamicListPage;
