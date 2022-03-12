import {
  IonButton,
  IonChip,
  IonCol,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import {
  addOutline,
  listOutline,
  closeOutline,
  calendarOutline,
  timeOutline,
  logoUsd,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { constants } from "../../hooks/Constants";
import UploadComponent from "../../pages/interfaces/UploadComponent";

interface ContainerProps {
  providerTrigger: any;
}

export const ProviderRegisterContainer: React.FC<ContainerProps> = ({
         providerTrigger,
       }) => {
         const [deliveryCharge, setDeliveryCharge] = useState();
         const [category, setCategory] = useState("");
         const [subCategory, setSubCategory] = useState<string[]>([]);
         const [subCategoryText, setSubCategoryText] = useState("");
         const [openAt, setOpenAt] = useState("");
         const [closeAt, setCloseAt] = useState("");
         const [days, setDays] = useState<string[]>(constants.DAYS_OF_WEEK);
         const [schedule, setSchedule] = useState<
           { days: string[]; open: string; close: string }[]
         >([]);
         const [urlImage, setUrlImage] = useState("");
         const registerSubCategory = () => {
           if (
             subCategory.indexOf(subCategoryText) === -1 &&
             subCategoryText !== ""
           ) {
             setSubCategory([...subCategory, subCategoryText]);
             setSubCategoryText("");
           }
         };
         const addSchedule = () => {
           if (schedule && days && openAt && closeAt) {
             if (schedule?.length === 0) {
               setSchedule([{ days: days, open: openAt, close: closeAt }]);
             } else {
               setSchedule([
                 ...schedule,
                 { days: days, open: openAt, close: closeAt },
               ]);
             }
             setDays(
               constants.SCHEDULE_DAYS_DATA.filter(
                 (day: string) => !days.includes(day)
               )
             );
             setOpenAt("");
             setCloseAt("");
           }
         };
         useEffect(() => {
           providerTrigger({
             schedule: schedule,
             subCategory: subCategory,
             deliveryCharge: deliveryCharge,
             category: category,
             urlImage: urlImage,
           });
         }, [deliveryCharge, category, subCategory, schedule, urlImage ]);
         return (
           <>
             <IonGrid>
               <IonRow>
                 <IonCol size="4" offset="4">
                   <IonLabel>{constants.LOGO_LABEL}</IonLabel>
                   <UploadComponent
                     signUp={true}
                     srcInitial={""}
                     output={async (value: any) => {
                       setUrlImage(value.Location);
                     }}
                   ></UploadComponent>
                 </IonCol>
                 <IonCol size-md="6" size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={logoUsd} slot="start" />
                     <IonLabel position="floating">
                       {constants.DELIVERY_CHARGE_LABEL}
                     </IonLabel>
                     <IonInput
                       min={"1"}
                       color="dark"
                       required={true}
                       maxlength={12}
                       name="deliveryCharge"
                       type="number"
                       value={deliveryCharge}
                       onIonChange={(deliveryChargeInput: any) =>
                         setDeliveryCharge(
                           deliveryChargeInput.target.value
                             ?.toString()
                             .trim()
                             .replace(/[^0-9]/gi, "")
                         )
                       }
                     />
                   </IonItem>
                   {deliveryCharge === 0 ? (
                     <IonText color="danger">
                       {constants.ERROR_DELIVERY_CHARGE}
                     </IonText>
                   ) : null}
                 </IonCol>
                 <IonCol size-md="6" size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={listOutline} slot="start" />
                     <IonLabel position="stacked">
                       {constants.SELECT_CATEGORY_LABEL}
                     </IonLabel>
                     <IonSelect
                       interface="popover"
                       color="dark"
                       defaultValue={category}
                       placeholder={constants.SELECT_CATEGORY_PLACEHOLDER}
                       onIonChange={(e: any) => setCategory(e.target.value)}
                     >
                       {constants.BUSINESS_CATEGORY?.map(
                         (category: string, index: number) => {
                           return (
                             <IonSelectOption key={index} value={category}>
                               {category}
                             </IonSelectOption>
                           );
                         }
                       )}
                     </IonSelect>
                   </IonItem>
                 </IonCol>
               </IonRow>
             </IonGrid>
             <IonGrid>
               <IonRow>
                 <IonCol size-md="6" size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={listOutline} slot="start" />
                     <IonLabel>{constants.ADD_CATEGORIES_LABEL}</IonLabel>
                     <IonInput
                       color="dark"
                       autocomplete="off"
                       type="text"
                       name="plate"
                       value={subCategoryText}
                       onKeyPress={(e: any) => {
                         if (e.key === "Enter") {
                           registerSubCategory();
                         }
                       }}
                       onIonChange={(e: any) => {
                         let preValue =
                           e.target.value?.charAt(0).toUpperCase() +
                           e.target.value?.slice(1);
                         preValue = preValue?.trim().replace(/[^a-zA-Z]/gi, "");
                         setSubCategoryText(preValue);
                       }}
                     />
                     <IonButton
                       size="default"
                       color="secondary"
                       onClick={() => {
                         registerSubCategory();
                       }}
                     >
                       <IonIcon icon={addOutline} />
                     </IonButton>
                   </IonItem>
                 </IonCol>
                 <IonCol size-md="6" size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={listOutline} slot="start" />
                     <IonLabel position="stacked">
                       {constants.CATEGORIES_LABEL}
                     </IonLabel>
                     {subCategory?.map((category: string, index: number) => {
                       return (
                         <IonChip
                           onClick={() => {
                             setSubCategory(
                               subCategory.filter(
                                 (item: string) => item !== category
                               )
                             );
                           }}
                           key={index}
                           color="secondary"
                         >
                           <IonIcon icon={closeOutline} />
                           <IonLabel>{category}</IonLabel>
                         </IonChip>
                       );
                     })}
                   </IonItem>
                 </IonCol>
               </IonRow>
             </IonGrid>

             <IonGrid hidden={days.length===0}>
               <IonLabel>{constants.SCHEDULE_LABEL}</IonLabel>
               <IonRow>
                 <IonCol size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={listOutline} slot="start" />
                     <IonLabel>{constants.SCHEDULE_DAYS_LABEL}</IonLabel>
                     {days?.map((day: string, index: number) => {
                       return (
                         <IonChip
                           onClick={() => {
                             if (days.length === 1) {
                               setDays(constants.SCHEDULE_DAYS_DATA);
                             } else {
                               setDays(
                                 days.filter((item: string) => item !== day)
                               );
                             }
                           }}
                           key={index}
                           color="secondary"
                         >
                           <IonIcon icon={closeOutline} />
                           <IonLabel>{day}</IonLabel>
                         </IonChip>
                       );
                     })}
                   </IonItem>
                 </IonCol>
               </IonRow>

               <IonRow>
                 <IonCol size-md="5" size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={timeOutline} slot="start" />
                     <IonLabel>{constants.SCHEDULE_OPENS_LABEL}</IonLabel>
                     <IonDatetime
                       color="dark"
                       displayFormat="h:mm A"
                       minuteValues="0,15,30,45"
                       value={openAt}
                       onIonChange={(e) => setOpenAt(e.detail.value!)}
                     ></IonDatetime>
                   </IonItem>
                 </IonCol>
                 <IonCol size-md="5" size-xs="12">
                   <IonItem>
                     <IonIcon color="primary" icon={timeOutline} slot="start" />
                     <IonLabel>{constants.SCHEDULE_ClOSE_LABEL}</IonLabel>
                     <IonDatetime
                       color="dark"
                       displayFormat="h:mm A"
                       minuteValues="0,15,30,45"
                       value={closeAt}
                       onIonChange={(e) => setCloseAt(e.detail.value!)}
                     ></IonDatetime>
                   </IonItem>
                 </IonCol>
                 <IonCol size-md="2" size-xs="12">
                   <IonButton
                     color="secondary"
                     onClick={() => (days.length > 0 ? addSchedule() : null)}
                   >
                     <IonIcon icon={calendarOutline} />
                     {constants.SCHEDULE_CONFIRM}
                   </IonButton>
                 </IonCol>
               </IonRow>
             </IonGrid>
           </>
         );
       };
