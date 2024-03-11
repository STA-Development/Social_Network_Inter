import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { stat } from "fs";

const selector = (state: RootState) => state.profile;

const profile = createSelector([selector], (state) => state.profile);
const name = createSelector([selector], (state) => state.profile.name);
const surname = createSelector([selector], (state) => state.profile.surname);
const email = createSelector([selector], (state) => state.profile.email);
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
  name,
  surname,
  email,
  shouldRedirectToCreateProfile,
  isProfileImageLoading,
};
