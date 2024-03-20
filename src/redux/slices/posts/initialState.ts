import { IPostsProps } from "../../../types/reduxTypes/postsStateTypes";

export const getInitialState = (): IPostsProps => ({
  post: {
    id: 0,
    imageUrl: "",
    postText: "",
    title: "",
  },
  isPostsLoading: false,
  posts: [],
});
