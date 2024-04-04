import { postsMiddleware, postsSlice } from "./index";
import { AppDispatch } from "../../store";
import API from "../../../manager/API";
import { IIndividualPost } from "../../../Interfaces/postsTypes";

const { setUserPosts, setPostsLoading } = postsSlice.actions;

const createPost =
  (data: IIndividualPost, page: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setPostsLoading(true));
      await API.posts.createPost(data);
      dispatch(postsMiddleware.getUserPosts(data.profileId, page));
    } catch (error) {
      throw new Error("Post creation failed");
    } finally {
      dispatch(setPostsLoading(false));
    }
  };

const getUserPosts =
  (profileId: number, page: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setPostsLoading(true));
      const res = await API.posts.getUserPosts(profileId, page);
      dispatch(setUserPosts(res.data.posts));
      return res;
    } catch (e) {
      throw new Error();
    } finally {
      dispatch(setPostsLoading(false));
    }
  };

export default {
  createPost,
  getUserPosts,
};
