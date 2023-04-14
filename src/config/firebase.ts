import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Bill } from "../entities";
import config from "../config";

firebase.initializeApp(config.firebaseConfig);

const fireAuth = firebase.auth;
const fireDb = firebase.database();

const pushCartFirebase = async (
  userId: string,
  providerId: string,
  data: any
) =>  {
  await fireDb.ref("cart").child(userId).child(providerId).set(data);
};

const refUserCar = (userId: string, providerId: string) => {
  return fireDb.ref("cart").child(userId).child(providerId);
};

const pushProviderBillsFirebase = async (bill: Bill) => {
  await fireDb
    .ref("providers")
    .child(bill.provider._id)
    .child(bill.code)
    .set(bill);
};
const pushStatesUserFirebase = async (bill: Bill, states: any) => {
  await fireDb.ref("users").child(bill.user._id).child(bill.code).set(states);
};
const deleteProviderBillsFirebase = (bill: Bill) => {
  fireDb.ref("providers").child(bill.provider._id).child(bill.code).remove();
};
const deleteUserBillsFirebase = (bill: Bill) => {
  fireDb.ref("users").child(bill.user._id).child(bill.code).remove();
};

const refByIdFirebase = (refTo: string, Id: string) => {
  return fireDb.ref(refTo).child(Id);
};

export {
  fireAuth,
  fireDb,
  pushCartFirebase,
  pushProviderBillsFirebase,
  refUserCar,
  refByIdFirebase,
  pushStatesUserFirebase,
  deleteProviderBillsFirebase,
  deleteUserBillsFirebase,
};
