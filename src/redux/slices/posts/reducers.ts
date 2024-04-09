import { SliceCaseReducers } from "@reduxjs/toolkit";
import { IAction } from "../../store";
import { IIndividualPost, IPosts } from "../../../Interfaces/postsTypes";
import { IPostsProps } from "../../../types/reduxTypes/postsStateTypes";

const createReducer = <T extends SliceCaseReducers<IPostsProps>>(
  reducer: T,
) => ({
  ...reducer,
});

const reducers = createReducer({
  setPostsLoading(state, action: IAction<boolean>) {
    state.isPostsLoading = action.payload;
  },
  setIndividualPost(state, action: IAction<IIndividualPost>) {
    state.post = action.payload;
  },
  setUserPosts(state, action: IAction<IIndividualPost[]>) {
    state.posts = action.payload;
  },
});

export default reducers;
