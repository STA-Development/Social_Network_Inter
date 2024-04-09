import firebase from "firebase/compat";
import UserMetadata = firebase.auth.UserMetadata;

export interface IUser {
  uid: number;
  name: string;
  surname: string;
  email: string;
}

export interface IComment {
  id: number;
  text: string;
  profileId: number;
  postId: number;
  userName: string;
  userSurname: string;
}
export interface IIndividualPost {
  id: number;
  imageUrl: string;
  postText: string;
  title: string;
}

export interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export interface UserCredential {
  providerId: string | null;
  user: User;
}
export interface User extends UserInfo {
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  providerData: UserInfo[];
  refreshToken: string;
  tenantId: string | null;
}
