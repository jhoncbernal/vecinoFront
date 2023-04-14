import React, { FC, useState, useEffect } from "react";
import { IonImg, IonSpinner, IonText } from "@ionic/react";
import style from "./style.module.css";
import { Storages } from "../../../hooks/Storage";
import config from "../../../config";
import Axios from "axios";

interface UploadComponentProps {
  output?: (data: any) => void;
  signUp?: boolean;
  srcInitial?: string;
  showError?: boolean;
}

const UploadComponent: FC<UploadComponentProps> = ({
  output,
  signUp = false,
  srcInitial = "assets/icon/icon.png",
  showError = false,
}) => {
  const [urlImage, setUrlImage] = useState<string>(srcInitial);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

const handleSubmit = async (file: any) => {
  const { getObject } = await Storages();
  const token: any = await getObject("token");

  if (!token && !signUp) {
    const err = new Error();
    err.message = "Sus credenciales vencieron";
    throw err;
  }

  setIsLoading(true);

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
        setIsLoading(false);
      } else {
        console.error(response);
      }
    })
    .catch((error) => {
      throw error;
    });
};


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setIsLoading(true);
      const filePendingUrl = URL.createObjectURL(file);
      setUrlImage(filePendingUrl);
      handleSubmit(file);
    }
  };

  useEffect(() => {
    setUrlImage(srcInitial ? srcInitial : "assets/icon/icon.png");
  }, [srcInitial]);

  const image = (
    <IonImg
      className={style["select-file"]}
      onClick={() => inputElement?.click()}
      src={urlImage}
    />
  );

  return (
    <form>
      <input
        type="file"
        className={style["hide-input"]}
        ref={(input) => setInputElement(input)}
        onChange={handleChange}
      />
      {isLoading ? (
        <div className={style["select-file"]}>
          <IonSpinner color="secondary" name="crescent" />
          {image}
        </div>
      ) : (
        image
      )}
      {showError && (
        <IonText color="blue" hidden={!showError}>
          no puede estar vacio
        </IonText>
      )}
    </form>
  );
};

export default UploadComponent;
