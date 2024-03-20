import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selector = (state: RootState) => state.profile;

const profile = createSelector([selector], (state) => state.profile);
const profileId = createSelector([selector], (state) => state.profile.id);
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
  profileId,
  email,
  shouldRedirectToCreateProfile,
  isProfileImageLoading,
};
