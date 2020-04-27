import firebase from "firebase";
import { Bill } from "../entities";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
firebase.initializeApp(firebaseConfig);

const fire_auth = firebase.auth;
const fire_db = firebase.database();

const pushCartFirebase = async (
  userId: string,
  providerId: string,
  data: any
) => {
  await fire_db.ref("cart").child(userId).child(providerId).set(data);
};

const refUserCar = (userId: string, providerId: string) => {
  return fire_db.ref("cart").child(userId).child(providerId);
};

const pushProviderBillsFirebase = async (bill: Bill) => {
  await fire_db
    .ref("providers")
    .child(bill.provider._id)
    .child(bill.code)
    .set(bill);
};

const deleteBillFirebase = (bill: Bill) => {
  fire_db.ref("providers").child(bill.provider._id).child(bill.code).remove();
};

const pushStatesUserFirebase = (bill: Bill, states: any) => {
  fire_db.ref("users").child(bill.user._id).child(bill.code).set(states);
};

const refProviderBillsFirebase = (IdProvider: string) => {
  return fire_db.ref("providers").child(IdProvider);
};
const refUserBillsFirebase = (IdProvider: string) => {
  return fire_db.ref("providers").child(IdProvider);
};

export {
  fire_auth,
  fire_db,
  pushCartFirebase,
  pushProviderBillsFirebase,
  refUserCar,
  refProviderBillsFirebase,
  refUserBillsFirebase,
  pushStatesUserFirebase,
  deleteBillFirebase
};
