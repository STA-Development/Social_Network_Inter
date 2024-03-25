import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selector = (state: RootState) => state.posts;

const IndividualPost = createSelector([selector], (state) => state.post);

export default IndividualPost;
