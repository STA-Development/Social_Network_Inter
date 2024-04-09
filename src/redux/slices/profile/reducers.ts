import { SliceCaseReducers } from "@reduxjs/toolkit";
import { IAction } from "../../store";
import { IProfileProps } from "../../../types/reduxTypes/profileStateTypes";
import { IProfile } from "../../../Interfaces/profileTypes";

const createReducer = <T extends SliceCaseReducers<IProfileProps>>(
  reducer: T,
) => ({
  ...reducer,
});

const reducers = createReducer({
  setProfileLoading(state, action: IAction<boolean>) {
    state.isProfileLoading = action.payload;
  },
  setProfile(state, action: IAction<IProfile>) {
    state.profile = action.payload;
  },
  setShouldRedirectToCreateProfile(state, action: IAction<boolean>) {
    state.shouldRedirectToCreateProfile = action.payload;
  },
  setUserAvatar(state, action: IAction<string>) {
    state.avatarURL = action.payload;
  },
  setProfileImageLoading(state, action) {
    state.isProfileImageLoading = action.payload;
  },
});

export default reducers;
