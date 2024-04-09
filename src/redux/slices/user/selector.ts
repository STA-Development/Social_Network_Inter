import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selector = (state: RootState) => state.user;

const isUserAuth = createSelector([selector], (state) => state.isUserAuth);
const isAuthLoading = createSelector(
  [selector],
  (state) => state.isAuthLoading,
);

export default { isUserAuth, isAuthLoading };
