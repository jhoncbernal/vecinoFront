import React, { FC, useState, useEffect } from "react";
import { IonImg, IonSpinner } from "@ionic/react";
import style from "./style.module.css";
import { Storages } from "../../../hooks/Storage";
import config from "../../../config";
import Axios from "axios";
interface ComponentData {
  [id: string]: any;
}
const UploadComponent: FC<ComponentData> = ({
  output,
  signUp = false,
  srcInitial = "assets/icon/icon.png",
}) => {
  const [urlImage, setUrlImage] = useState<string>();
  const [inputElement, setInputElement] = useState();
  const [spinnerLoading, setSpinnerLoading] = useState<boolean>(false);
  const handleSubmit = async (file: any) => {
    const { getObject } = await Storages();
    const token: any = await getObject("token");

    if (!token && !signUp) {
      const err = new Error();
      err.message = "Sus credenciales vencieron";
      throw err;
    }
    const header = {
      Authorization: signUp ? "" : token.obj,
      "Access-Control-Allow-Origin": "*",
      encType: "multipart/form-data",
    };
    const url = `${config.BASE_URL}${config.API_VERSION}${config.FileUploadImageContext}`;
    const data = new FormData();
    data.append("image", file);
    await Axios.post(url, data, { headers: header })
      .then((response: any) => {
        if (response.status === 200) {
          if (output) {
            output(response.data);
          }
          setSpinnerLoading(false);
        } else {
          console.error(response);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    setUrlImage(srcInitial.length > 0 ? srcInitial : "assets/icon/icon.png");
  }, [srcInitial]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpinnerLoading(true);
    const file = event.target.files![0];
    const filePendingUrl = URL.createObjectURL(file);
    setUrlImage(filePendingUrl);
    handleSubmit(file);
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
    <form>
      <input
        type="file"
        className={style["hide-input"]}
        ref={(input) => setInputElement(input)}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      {spinnerLoading ? loadingImage() : imageLoaded()}
    </form>
  );
};

export default UploadComponent;
