import { postsMiddleware, postsSlice } from "./index";
import { dispatch } from "../../hooks";
import { AppDispatch } from "../../store";
import API from "../../../manager/API";

const { setUserPosts, setPostsLoading } = postsSlice.actions;

const createPost =
  (data: object, profileId: number, page: number) =>
  async (dispatch: AppDispatch) => {
    try {
      await API.posts.createPost(data);
      dispatch(postsMiddleware.getUserPosts(profileId, page));
    } catch (error) {
      throw new Error();
    } finally {
    }
  };

const getUserPosts =
  (profileId: number, page: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await API.posts.getUserPosts(profileId, page);
      dispatch(setUserPosts(res.data.posts));
      return res;
    } catch (e) {
      throw new Error();
    }
  };

export default {
  createPost,
  getUserPosts,
};
