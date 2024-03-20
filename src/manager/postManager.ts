import { Axios } from "./axiosinstance";

const axiosInstance = Axios();
const postsManager = {
  axiosInstance,
  createPost(data: object) {
    try {
      return axiosInstance.post(`post`, data);
    } catch (error) {
      throw new Error();
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
