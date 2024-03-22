import { AppDispatch } from "../../store";
import API from "../../../manager/API";
import { userSlice } from "./index";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth, provider} from "../../../firebase";
import {dispatch} from "../../hooks";
import React from "react";

const { setIsUserAuth, setIsAuthLoading } = userSlice.actions;
const isUserAuth = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsUserAuth(isAuth));
};
const isAuthLoading = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsAuthLoading(isAuth));
};

const userSignInWithEmailAndPassword = (email: string, password: string)=>  async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
    );
    const accessToken = await auth.currentUser?.getIdToken();
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  } catch (error: unknown) {
    throw new Error("Sign in failed")
  }
};

const userSignInWithGoogle = () => async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const token = localStorage.getItem("accessToken");
  } catch (error: unknown) {
    throw new Error("Google Sign in failed")
  }
};

const userSignUpWithEmailAndPassword = (email: string, password: string) => async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    );
    const user = userCredential.user;
  } catch (error: unknown) {
    throw  new Error("Sign up failed");
  }
};

const userSignUpWithGoogle = () => async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
  } catch (error: unknown) {
    throw  new Error("Sign up failed");
  }
};

const userSignOut = () => async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("accessToken");
  } catch (error: unknown) {
    throw  new Error("You're still logged in");
  }
};

export default {
  isUserAuth,
  isAuthLoading,
  userSignInWithEmailAndPassword,
  userSignInWithGoogle,
  userSignUpWithEmailAndPassword,
  userSignUpWithGoogle,
  userSignOut,
};
