import { AppDispatch } from "../../store";
import { profileSlice } from "./index";
import API from "../../../manager/API";
import profileManager from "../../../manager/profileManager";
import { dispatch } from "../../hooks";
import { createAction } from "@reduxjs/toolkit";

const {
  setProfileLoading,
  setShouldRedirectToCreateProfile,
  setProfile,
  setUserAvatar,
  setProfileImageLoading,
} = profileSlice.actions;

const getProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setProfileLoading(true));
    const response = await API.profile.getUserProfile();
    dispatch(setProfile(response.data));
    return response.data;
  } catch (error: any) {
    if (error.message && error.response?.status === 404) {
      dispatch(setShouldRedirectToCreateProfile(true));
    }
  }
};

const updateProfileImage = (image: string) => async (dispatch: AppDispatch) => {
  dispatch(setUserAvatar(image));
};

const sendProfileData =
  (data: object, callBack: () => void) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfileLoading(true));
      await API.profile.sendUserProfileInfo(data);
      callBack();
    } catch (error: any) {
      throw error;
    }
  };

const shouldRedirectToCreateProfile =
  (shouldRedirect: boolean) => async (dispatch: AppDispatch) => {
    dispatch(setShouldRedirectToCreateProfile(shouldRedirect));
  };

const updateUserAvatar =
  (avatarURL: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfileImageLoading(true));
      await API.profile.updateUserAvatar(avatarURL);
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      dispatch(setProfileImageLoading(false));
    }
  };

export default {
  getProfile,
  sendProfileData,
  shouldRedirectToCreateProfile,
  updateUserAvatar,
  updateProfileImage,
};
