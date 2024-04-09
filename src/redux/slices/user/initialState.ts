import { IUserProps } from "../../../types/reduxTypes/userStateTypes";

export const getInitialState = (): IUserProps => ({
  user: null,
  isUserAuth: false,
  isAuthLoading: true,
});
