import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selector = (state: RootState) => state.posts;

const individualPost = createSelector([selector], (state) => state.post);
const userPosts = createSelector([selector], (state) => state.posts);
const isPostsLoading = createSelector(
  [selector],
  (state) => state.isPostsLoading,
);

export default { individualPost, userPosts, isPostsLoading };