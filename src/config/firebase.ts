import  firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
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
const pushStatesUserFirebase = async (bill: Bill, states: any) => {
  await fire_db.ref("users").child(bill.user._id).child(bill.code).set(states);
};
const deleteProviderBillsFirebase = (bill: Bill) => {
  fire_db.ref("providers").child(bill.provider._id).child(bill.code).remove();
};
const deleteUserBillsFirebase = (bill: Bill) => {
  fire_db.ref("users").child(bill.user._id).child(bill.code).remove();
};


const refByIdFirebase = (refTo:string,Id: string) => {
  return fire_db.ref(refTo).child(Id);
};

export {
  fire_auth,
  fire_db,
  pushCartFirebase,
  pushProviderBillsFirebase,
  refUserCar,
  refByIdFirebase,
  pushStatesUserFirebase,
  deleteProviderBillsFirebase,
  deleteUserBillsFirebase
};
