import { AppDispatch } from "../../store";
import { profileSlice } from "./index";
import API from "../../../manager/API";
import { IProfileFormData } from "../../../Interfaces/profileTypes";

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
  } finally {
    dispatch(setProfileLoading(false));
  }
};

const updateProfileImage = (image: string) => async (dispatch: AppDispatch) => {
  dispatch(setUserAvatar(image));
};

const sendProfileData =
  (data: IProfileFormData, callBack: () => void) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfileLoading(true));
      await API.profile.sendUserProfileInfo(data);
      callBack();
    } catch (error: unknown) {
      throw new Error("Profile info is not sent");
    } finally {
      dispatch(setProfileLoading(false));
    }
  };

const shouldRedirectToCreateProfile =
  (shouldRedirect: boolean) => async (dispatch: AppDispatch) => {
    dispatch(setShouldRedirectToCreateProfile(shouldRedirect));
  };

const updateUserAvatar =
  (avatarURL: string | null) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfileImageLoading(true));
      await API.profile.updateUserAvatar(avatarURL);
      if (avatarURL != null) {
        dispatch(setUserAvatar(avatarURL));
      }
    } catch (error: unknown) {
      throw new Error("Image upload failed");
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
