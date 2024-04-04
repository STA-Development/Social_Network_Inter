import { IProfile } from "../../Interfaces/profileTypes";

export interface IProfileProps {
  profile: IProfile | null;
  isProfileLoading: boolean;
  shouldRedirectToCreateProfile: boolean;
  avatarURL: string;
  isProfileImageLoading: boolean;
}
