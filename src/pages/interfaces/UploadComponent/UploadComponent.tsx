import React, { FC, useState } from "react";
import { IonCard, IonCardContent, IonImg, IonSpinner } from "@ionic/react";
import style from "./style.module.css";
import { Storages } from "../../../hooks/Storage";
import { BASEURL, APIVERSION } from "../../../config";
import Axios from "axios";
interface componentData {
  [id: string]: any;
}
const UploadComponent: FC<componentData> = props => {
  const [urlImage, setUrlImage] = useState<string>("assets/icon/icon.png");
  let [inputElement, setInputElement] = useState();
  let [spinnerLoading, setSpinnerLoading] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpinnerLoading(false);
    let file = event.target.files![0];
    const filePendingUrl = URL.createObjectURL(file);
    setUrlImage(filePendingUrl);
    handleSubmit(file);
  };
  const handleSubmit = async (file: any) => {
    const { getObject } = await Storages();
    let token: any = await getObject("token");

    if (!token) {
      const err = new Error();
      err.message = "Sus credenciales vencieron";
      throw err;
    }
    let header = {
      Authorization: token.obj,
      "Access-Control-Allow-Origin": "*",
      encType: "multipart/form-data"
    };
    let url = `${BASEURL}${APIVERSION}/file/images/upload`;
    const data = new FormData();
    data.append("image", file);
    await Axios.post(url, data, { headers: header })
      .then((response: any) => {
        if (response.status === 200) {
          props.output(response.data.Location);
          setSpinnerLoading(true);
        } else {
          console.error(response);
        }
      })
      .catch(error => {
        throw error;
      });
  };
  const loadingImage = () => {
    return (
      <div className={style["select-file"]}>
        <IonSpinner color="secondary" name="crescent" />
        <IonImg
          onClick={() => {
            inputElement.click();
          }}
          src={urlImage}
        ></IonImg>
      </div>
    );
  };
  const imageLoaded = () => {
    return (
      <IonImg
        className={style["select-file"]}
        onClick={() => {
          inputElement.click();
        }}
        src={urlImage}
      ></IonImg>
    );
  };
  return (
    <IonCard hidden={false}>
      <IonCardContent>
        <form>
          <input
            type="file"
            className={style["hide-input"]}
            ref={input => setInputElement(input)}
            onChange={e => {
              handleChange(e);
            }}
          ></input>
          {spinnerLoading ? imageLoaded() : loadingImage()}
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default UploadComponent;
