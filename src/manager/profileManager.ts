import { getEnvironmentalVariables } from "../utils/getEnvironmentalVariables";
import { Axios } from "./axiosinstance";

const baseURL = getEnvironmentalVariables().REACT_APP_API_URL;
const axiosInstance = Axios();
const profileManager = {
  axiosInstance,
  getUserProfile() {
    try {
      return axiosInstance.get(`/profile`);
    } catch (error) {
      throw new Error();
    }
  },
  sendUserProfileInfo(data: object) {
    return axiosInstance.post(`profile`, data);
  },
  updateUserAvatar(avatarURL: string) {
    return axiosInstance.patch("/profile", { avatarUrl: avatarURL });
  },
};
export default profileManager;
