import { IPostsProps } from "../../../types/reduxTypes/postsStateTypes";

export const getInitialState = (): IPostsProps => ({
  post: null,
  isPostsLoading: false,
  posts: [],
});
