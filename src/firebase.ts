import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { getEnvironmentalVariables } from "./utils/getEnvironmentalVariables";

const {
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_API_KEY,
} = getEnvironmentalVariables();

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
export const provider = new GoogleAuthProvider();
