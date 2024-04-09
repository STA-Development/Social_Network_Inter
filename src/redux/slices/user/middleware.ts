import { AppDispatch } from "../../store";
import { userSlice } from "./index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../../../firebase";
import React from "react";

const { setIsUserAuth, setIsAuthLoading } = userSlice.actions;
const isUserAuth = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsUserAuth(isAuth));
};
const isAuthLoading = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsAuthLoading(isAuth));
};

const userSignOut = () => async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("accessToken");
  } catch (error: unknown) {
    throw new Error("Login failed");
  }
};

const userSignInWithEmailAndPassword =
  (email: string, password: string) => async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const accessToken = await auth.currentUser?.getIdToken();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    } catch (error: unknown) {
      throw new Error("Sign in failed");
    }
  };

const userSignInWithGoogle = () => async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
  } catch (error: unknown) {
    throw new Error("Sign in failed");
  }
};

const userSignUpWithEmailAndPassword =
  (email: string, password: string) => async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
    } catch (error: unknown) {
      throw new Error("Sign up failed");
    }
  };

const userSignUpWithGoogle = () => async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
  } catch (error: unknown) {
    throw new Error("Sign up failed");
  }
};

export default {
  isUserAuth,
  isAuthLoading,
  userSignOut,
  userSignInWithEmailAndPassword,
  userSignInWithGoogle,
  userSignUpWithEmailAndPassword,
  userSignUpWithGoogle,
};
