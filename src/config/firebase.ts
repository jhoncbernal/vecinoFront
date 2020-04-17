import firebase from "firebase";
import { Storages } from "../hooks/Storage";
import { async } from "q";

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

const pushFirebase = (user: any, id: string, data: any) => {
  refUser(user).child(id).set(data);
};

const refUser = (user: any) => {
  return fire_db.ref("cart").child(user._id);
};

export { fire_auth, fire_db, pushFirebase, refUser };
