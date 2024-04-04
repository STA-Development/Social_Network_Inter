import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selector = (state: RootState) => state.profile;

const profile = createSelector([selector], (state) => state.profile);
const shouldRedirectToCreateProfile = createSelector(
  [selector],
  (state) => state.shouldRedirectToCreateProfile,
);
const isProfileImageLoading = createSelector(
  [selector],
  (state) => state.isProfileImageLoading,
);

export default {
  profile,
  shouldRedirectToCreateProfile,
  isProfileImageLoading,
};
