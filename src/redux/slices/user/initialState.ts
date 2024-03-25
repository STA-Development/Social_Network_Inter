import { IUserProps } from "../../../types/reduxTypes/userStateTypes";

export const getInitialState = (): IUserProps => ({
  user: {
    uid: 0,
    name: "",
    surname: "",
    email: "",
  },
  isUserAuth: false,
  isAuthLoading: true,
});
