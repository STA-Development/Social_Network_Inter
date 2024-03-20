import { IProfileProps } from "../../../types/reduxTypes/profileStateTypes";
import { IProfile } from "../../../Interfaces/profileTypes";

export const getInitialState = (): IProfileProps => ({
  profile: {
    id: 0,
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
