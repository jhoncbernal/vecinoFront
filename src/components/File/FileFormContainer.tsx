import React, { FormEvent } from 'react';
import { Storages } from '../../hooks/Storage'
import { APIVERSION, BASEURL } from '../../config/index';
import {
    IonContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonCard,
    IonToast,
    IonProgressBar,
    IonImg,
    IonCardHeader,
    IonCardContent,
    IonText
} from "@ionic/react";
import { documentTextOutline } from 'ionicons/icons';
import axios from 'axios';
export class FileFormPage extends React.Component<{ history: any },
    {
        file: any,
        showToast1: boolean,
        message: string,
        hiddenbar: boolean,
    }> {

    constructor(props: any) {
        super(props);
        this.state = {
            file: '',
            showToast1: false,
            message: '',
            hiddenbar: true,
        }
    }


    async handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            this.setState({ 'hiddenbar': false })
            const { getObject } = await Storages();
            let token: any = await getObject('token');
            if (!token) {
                const err = new Error();
                err.message = 'sus credenciales vencieron';
                throw err;
            } let header = {
                'Authorization': token.obj,
                'Access-Control-Allow-Origin': '*',
                'encType': 'multipart/form-data'
            }
            let url = `${BASEURL}${APIVERSION}/file`;
            const data = new FormData()
            data.append('file', this.state.file)
            await axios.post(url, data, { headers: header })
                .then((response: any) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.setState({ 'message': 'Cartera actualizada' });
                        this.setState({ 'hiddenbar': true })
                        this.setState({ 'showToast1': true })
                    } else {
                        console.log(response)
                        const err = new Error();
                        err.message = 'sin conexion con el servidor ' + response.ErrorMessage;
                        throw err;
                    }
                    return { response };
                })
                .catch((error) => {
                    try {
                        this.setState({ 'hiddenbar': true });
                        this.setState({ 'message': error });
                        this.setState({ 'showToast1': true })
                    } catch (e) { throw e }
                });
        } catch (e) {
            this.setState({ 'hiddenbar': true })
            this.setState({ 'message': e.message });
            console.error("FileFormPage: " + e);
            this.setState({ 'showToast1': true })

            this.props.history.push(
                '/home'
            )
        }
    }



    render() {

        return (
            <>
                <IonContent class="bg-image">
                    <IonItem >
                        <IonImg class='img' src={'/assets/img/IconLogo.png'} />
                    </IonItem>
                    <form onSubmit={e => this.handleSubmit(e)} action="post">
                        <IonCard class="card-login">
                            <IonCardHeader>
                                <h3> Actualizar cartera</h3>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText color="primary">  <h3>Por favor agrege el documento con la cartera actualizada</h3></IonText>
                                <IonItem>
                                    <IonLabel color='dark' position="stacked"  >Documento excel:</IonLabel>
                                    <IonIcon color='primary' icon={documentTextOutline} slot="start" />

                                    <input color='dark' required={true} name='file' type='file' accept="*.xlsx" onChange={(file: any) => this.setState({ 'file': file.target.files[0] })} />
                                </IonItem>
                            </IonCardContent>
                            <IonProgressBar hidden={this.state.hiddenbar} type="indeterminate"></IonProgressBar><br />
                        </IonCard>
                        <IonButton class='btn-login' type="submit">Subir</IonButton>
                    </form>


                    <IonToast
                        isOpen={this.state.showToast1}
                        onDidDismiss={() => this.setState({ 'showToast1': false })}
                        message={this.state.message}
                        duration={2000}
                    />


                </IonContent>
            </>
        );
    }
}