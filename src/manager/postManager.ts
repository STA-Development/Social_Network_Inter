import { Axios } from "./axiosinstance";
import { IIndividualPost } from "../Interfaces/postsTypes";

const axiosInstance = Axios();
const postsManager = {
  axiosInstance,
  createPost(data: IIndividualPost) {
    try {
      return axiosInstance.post(`post`, data);
    } catch (error) {
      throw new Error("Post data is not sent");
    }
  },
  getUserPosts(profileId: number, page: number) {
    try {
      return axiosInstance.get(`/post/${profileId}?page=${page}`);
    } catch (error) {
      throw new Error();
    }
  },
};

export default postsManager;
