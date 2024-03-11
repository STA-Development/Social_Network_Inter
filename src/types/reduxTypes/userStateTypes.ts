import { IUser } from "../../Interfaces/userTypes";

export interface IUserProps {
  user: IUser;
  isAuthLoading: boolean;
  isUserAuth: boolean;
}
