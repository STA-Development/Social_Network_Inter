import { SliceCaseReducers } from "@reduxjs/toolkit";
import { IAction } from "../../store";
import { IPostsProps } from "../../../types/reduxTypes/postsStateTypes";
import { IUserProps } from "../../../types/reduxTypes/userStateTypes";

const createReducer = <T extends SliceCaseReducers<IUserProps>>(
  reducer: T,
) => ({
  ...reducer,
});

const reducers = createReducer({
  setIsUserAuth(state, action: IAction<boolean>) {
    state.isUserAuth = action.payload;
  },
  setIsAuthLoading(state, action: IAction<boolean>) {
    state.isAuthLoading = action.payload;
  },
});

export default reducers;
