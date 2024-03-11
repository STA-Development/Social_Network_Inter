import { IProfile } from "../../Interfaces/profileTypes";

export interface IProfileProps {
  profile: IProfile;
  isProfileLoading: boolean;
  shouldRedirectToCreateProfile: boolean;
  userAvatarURL: string;
  isProfileImageLoading: boolean;
}
