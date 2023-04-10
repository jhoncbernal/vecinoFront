import React, { FC, useState } from "react";
import { IonImg, IonSpinner } from "@ionic/react";
import style from "./style.module.css";
interface ComponentData {
  [id: string]: any;
  onChange: (file: File | undefined) => void;
}
const UploadImage: FC<ComponentData> = ({ spinnerLoading, onChange }) => {
  const [file, setFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    "assets/icon/icon.png",
  );
  const [inputElement, setInputElement] = useState();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;

    if (selectedFile) {
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result?.toString());
      };
      reader.readAsDataURL(selectedFile);
    }
    onChange(selectedFile);
  };
  const loadingImage = () => {
    return (
      <div className={style["select-file"]}>
        <IonSpinner color="secondary" name="crescent" />
        <IonImg
          onClick={() => {
            inputElement.click();
          }}
          src={previewUrl}
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
        src={previewUrl}
      ></IonImg>
    );
  };
  return (
    <form>
      <input
        type="file"
        className={style["hide-input"]}
        onChange={handleFileInputChange}
        ref={(input) => setInputElement(input)}
      ></input>
      {spinnerLoading ? loadingImage() : imageLoaded()}
    </form>
  );
};

export default UploadImage;
