import { IProfileProps } from "../../../types/reduxTypes/profileStateTypes";
import { IProfile } from "../../../Interfaces/profileTypes";

export const getInitialState = (): IProfileProps => ({
  profile: {
    name: "",
    surname: "",
    email: "",
    avatarUrl: "",
  },
  shouldRedirectToCreateProfile: false,
  isProfileLoading: false,
  userAvatarURL: "",
  isProfileImageLoading: false,
});
