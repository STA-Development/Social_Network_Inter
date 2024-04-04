import { IUser } from "../../Interfaces/userTypes";

export interface IUserProps {
  user: IUser | null;
  isAuthLoading: boolean;
  isUserAuth: boolean;
}
