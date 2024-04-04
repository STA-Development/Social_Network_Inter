import { IProfileProps } from "../../../types/reduxTypes/profileStateTypes";

export const getInitialState = (): IProfileProps => ({
  profile: null,
  shouldRedirectToCreateProfile: false,
  isProfileLoading: false,
  avatarURL: "",
  isProfileImageLoading: false,
});
