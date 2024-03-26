import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA377qI92uime9V20hHMekha0TiUZkTCxY",
  authDomain: "fir-auth-email-pass-3239f.firebaseapp.com",
  projectId: "fir-auth-email-pass-3239f",
  storageBucket: "fir-auth-email-pass-3239f.appspot.com",
  messagingSenderId: "95391398711",
  appId: "1:95391398711:web:877289a68968be385578b2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
