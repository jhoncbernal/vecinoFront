import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import React from "react";
interface ContainerProps {
  [id: string]: any;
}
const UploadImageButton: React.FC<ContainerProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;

    if (selectedFile) {
      setFile(selectedFile);
      onChange(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result?.toString());
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" className="ion-text-center">
          <IonItem lines="none">
            {previewUrl ? (
              <IonImg
                src={previewUrl}
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              <div className="image-placeholder">
                <IonIcon icon={cameraOutline} size="large" />
                <IonLabel>Select Image</IonLabel>
              </div>
            )}
          </IonItem>
        </IonCol>
        <IonCol size="12" className="ion-text-center">
          <IonItem lines="none">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </IonItem>
        </IonCol>
        <IonCol size="12" className="ion-text-center">
          <IonButton color="primary" disabled={!file}>
            Upload
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default UploadImageButton;
