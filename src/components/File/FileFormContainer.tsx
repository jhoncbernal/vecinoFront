import React, { FormEvent } from "react";
import { Storages } from "../../hooks/Storage";
import config from "../../config/index";

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
  IonText,
  IonSegmentButton,
  IonSegment,
  IonTitle,
} from "@ionic/react";
import { documentTextOutline } from "ionicons/icons";
import axios from "axios";
import * as H from "history";
export class FileFormPage extends React.Component<
  { history: H.History },
  {
    file: any;
    showToast1: boolean;
    message: string;
    hiddenbar: boolean;
    segmentValue: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: "",
      showToast1: false,
      message: "",
      hiddenbar: true,
      segmentValue: "",
    };
  }

  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      this.setState({ hiddenbar: false });
      const { getObject } = await Storages();
      let token: any = await getObject("token");
      if (!token) {
        const err = new Error();
        err.message = "sus credenciales vencieron";
        throw err;
      }
      let header = {
        Authorization: token.obj,
        "Access-Control-Allow-Origin": "*",
        encType: "multipart/form-data",
      };
      let url;
      if (this.state.segmentValue === "cartera") {
        url = `${config.BASE_URL}${config.API_VERSION}/${config.FileContext}`;
      } else {
        url = `${config.BASE_URL}${config.API_VERSION}/${config.FileContext}/FileUsers`;
      }

      const data = new FormData();
      data.append("file", this.state.file);
      await axios
        .post(url, data, { headers: header })
        .then((response: any) => {
          if (response.status === 200) {
            this.setState({
              message: `los datos de ${this.state.segmentValue} fueron actualizados`,
            });
            this.setState({ hiddenbar: true });
            this.setState({ showToast1: true });
          } else {
            const err = new Error();
            err.message =
              "sin conexion con el servidor " + response.ErrorMessage;
            throw err;
          }
          return { response };
        })
        .catch((error) => {
          try {
            this.setState({ hiddenbar: true });
            this.setState({ message: error });
            this.setState({ showToast1: true });
          } catch (e) {
            throw e;
          }
        });
    } catch (e) {
      this.setState({ hiddenbar: true });
      this.setState({ message: e.message });
      console.error("FileFormPage: " + e);
      this.setState({ showToast1: true });

      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <>
        <IonContent class="bg-image">
          <IonItem>
            <IonImg class="img" src={"/assets/img/IconLogo.png"} />
          </IonItem>
          <form onSubmit={(e) => this.handleSubmit(e)} action="post">
            <IonCard class="card-center">
              <IonCardHeader>
                <IonTitle class="ion-text-center">Actualizar</IonTitle>
                <IonLabel
                  hidden={!!this.state.segmentValue}
                  class="ion-text-center"
                >
                  Seleccion un campo:
                </IonLabel>
                <IonSegment
                  onIonChange={(e: any) => {
                    this.setState({ segmentValue: e.target.value });
                  }}
                  value={this.state.segmentValue}
                >
                  <IonSegmentButton value={"cartera"}>cartera</IonSegmentButton>
                  <IonSegmentButton value={"usuarios"}>
                    usuarios
                  </IonSegmentButton>
                </IonSegment>
              </IonCardHeader>

              {this.state.segmentValue ? (
                <IonCardContent>
                  <IonText color="primary">
                    <h3>
                      {`Por favor agrege el documento con los datos de ${this.state.segmentValue} actualizados`}
                    </h3>
                  </IonText>
                  <IonItem lines='none' >
                    <IonLabel color="dark" position="stacked" >
                      Documento excel:
                    </IonLabel>
                    <IonIcon
                      color={this.state.file?'success':'primary'}
                      icon={documentTextOutline}
                      slot="start"
                    />
                    <div className="ion-magin">
                      <input
                      required={true}
                        type="file"
                        className="custom-file-input "
                        id="customFile"
                        accept="*.xlsx"
                        onChange={(file: any) =>
                          this.setState({ file: file.target.files[0] })
                        }
                      />
                    </div>
                  </IonItem>

                </IonCardContent>
              ) : null}
              <IonProgressBar
                hidden={this.state.hiddenbar}
                type="indeterminate"
              ></IonProgressBar>
              <br />
            </IonCard>
            <IonButton
              disabled={!this.state.file||!this.state.hiddenbar}
              class="btn-login"
              type="submit"
            >
              Subir
            </IonButton>
          </form>

          <IonToast
            isOpen={this.state.showToast1}
            onDidDismiss={() => this.setState({ showToast1: false })}
            message={this.state.message}
            duration={2000}
          />
        </IonContent>
      </>
    );
  }
}
