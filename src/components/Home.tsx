import React  from 'react';
import { IonContent, IonItem, IonImg,  IonCard,  IonCardHeader,   IonProgressBar, IonAlert, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/react';
import { HttpRequest } from '../hooks/HttpRequest';
import DynamicList from './DynamicList';
import { Storages } from '../hooks/Storage';
import { carSportSharp, bicycleSharp, peopleSharp, bicycleOutline } from 'ionicons/icons';
export class DynamicListPage extends React.Component<{ history: any }, {
  usersArray: Array<any>, hiddenbar: boolean, showAlert1: boolean, message: string
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      usersArray: [], hiddenbar: false, showAlert1: false, message: ''
    }

    this.request();
  }

  async request() {
    try {
      const {getObject}=await Storages();
      let user: any = await getObject('token');
      if (!user) {
        const err = new Error();
                    err.message = 'sus credenciales vencieron';
                    throw err;
      }
      
      let header = {
        'Authorization': user.obj.response.token,
      }
      let url = 'http://localhost:4000/v1/api/user';

      const resultado: any = await HttpRequest(url, 'GET', header);
      if (!resultado.resultado.response.status) {
        this.setState({ 'usersArray': resultado.resultado.response });
      }
      else {
        const err = new Error();
        
                    err.message = resultado.resultado.response.message;
                    throw err;
         
      }
      this.setState({ 'hiddenbar': true })


    } catch (e) {
      console.log(e.message)
      const {removeItem}=await Storages();
      await removeItem('token');
      this.setState({ 'message': e.message });
      this.setState({ 'showAlert1': true });
      console.error("DynamicListPage: " + e);
      this.setState({ 'hiddenbar': true })
      this.props.history.push(
        '/tab1'
      )
    }
  }


  render() {
    return (

      <>
        <IonContent class="bg-image">
          <IonItem>
            <IonImg class='img' src={'https://drive.google.com/uc?export=view&id=1ZyIa6S4-qgL1FpdhzYrbC8EEYhe1G7P0'} />
          </IonItem>
          
          <IonCard class="card-login">
          <IonToolbar>
          <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="Users">
              <IonIcon icon={peopleSharp} />
            </IonSegmentButton>
            <IonSegmentButton value="Cars">
              <IonIcon icon={carSportSharp} />
            </IonSegmentButton>
            <IonSegmentButton value="Bikes">
            <IonIcon icon={bicycleSharp} />
              <IonIcon color='light' size='large'  slot="icon-only" src='/assets/icons/Supersport.svg' />
            </IonSegmentButton>
            <IonSegmentButton value="Motorcycles">
              <IonIcon icon={bicycleSharp} />
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
