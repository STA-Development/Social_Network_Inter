import { AppDispatch } from "../../store";
import API from "../../../manager/API";
import { userSlice } from "./index";

const { setIsUserAuth, setIsAuthLoading } = userSlice.actions;
const isUserAuth = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsUserAuth(isAuth));
};
const isAuthLoading = (isAuth: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsAuthLoading(isAuth));
};

export default {
  isUserAuth,
  isAuthLoading,
};
