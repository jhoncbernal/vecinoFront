import React from 'react';
import { IonContent, IonImg, IonCard, IonProgressBar, IonAlert, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonTitle } from '@ionic/react';
import { HttpRequest } from '../hooks/HttpRequest';
import ListContainer from './User/ListContainer';
import ParkingListContainer from './ParkingSpace/ListContainer';
import { Storages } from '../hooks/Storage';
import { carSportSharp, bicycleSharp, peopleSharp } from 'ionicons/icons';
export class DynamicListPage extends React.Component<{ history: any }, {
  usersArray: Array<any>,vehiclesArray: Array<any>, hiddenbar: boolean, showAlert1: boolean, message: string, currentUser: any,params: any,loaddata:boolean
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      usersArray: [],vehiclesArray: [], hiddenbar: false, showAlert1: false, message: '', currentUser: '',params:'',loaddata:false
    }
  }

  async request(params:any) {
    try {
      this.setState({ 'hiddenbar': false });
      this.setState({ 'loaddata': false });
      this.setState({ 'usersArray': [] });
      this.setState({ 'vehiclesArray': [] });
      let pathurl;
      if(params==='user'){
        pathurl = `/user`;
      }else{
        pathurl = `/parkingspace/${params}`;
      }
      await HttpRequest(pathurl, 'GET', '',true)      
      .then(async(resultado: any) => {        
        try{if(resultado.status){
          this.setState({ 'message': 'No se encontro ningun' });
          this.setState({ 'showAlert1': true });
        }}catch(e){
          console.error(e);
        }
        console.log(resultado);
        if(Array.isArray(resultado)){
      this.setState({ 'usersArray': resultado });
    } else{
      this.setState({ 'vehiclesArray': resultado.positions });
    }
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
      this.setState({ 'loaddata': true });
      })
      .catch(error =>  {if(error.message.includes('404')){
        this.setState({ 'loaddata': true });
        this.setState({ 'hiddenbar': true });
      }else{
        throw error;
      }});
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
        <IonToolbar ><IonTitle> <IonImg class='img' src={'/assets/img/IconLogo.png'} /></IonTitle>
          <IonTitle color='primary'>{`${this.state.currentUser.firstName}`}</IonTitle>
        </IonToolbar>
        <IonToolbar >
        </IonToolbar>
        <IonContent class="bg-image">
          <IonCard class="card-login">
            <IonToolbar>
              <IonSegment  onIonChange={(e) => {
                this.request(e.detail.value);
                this.setState({'params':e.detail.value});
              }
                } color="secondary" >
                <IonSegmentButton value="user" >
                  <IonIcon class='icons-segment' size='medium' icon={peopleSharp} />
                </IonSegmentButton>
                <IonSegmentButton  value="Cars">
                  <IonIcon class='icons-segment' size='medium' icon={carSportSharp} />
                </IonSegmentButton>
                <IonSegmentButton value="Motorcycles">
                  <IonIcon class='icons-segment' size='medium' src={'assets/icons/motorcycleSharp.svg'} />
                </IonSegmentButton>
                <IonSegmentButton value="Bikes">
                  <IonIcon class='icons-segment' size='medium' icon={bicycleSharp} />
                </IonSegmentButton>
              </IonSegment>
            </IonToolbar>

            {this.state.params==='user'&&this.state.hiddenbar
              ? <ListContainer        loaddata={this.state.loaddata} inputs={this.state.usersArray}></ListContainer>
              : <ParkingListContainer parkingType={this.state.params} loaddata={this.state.loaddata} inputs={this.state.vehiclesArray}></ParkingListContainer>
            }

            
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
