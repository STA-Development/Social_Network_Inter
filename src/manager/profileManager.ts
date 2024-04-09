import { Axios } from "./axiosinstance";
import { IProfileFormData } from "../Interfaces/profileTypes";

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
  sendUserProfileInfo(data: IProfileFormData) {
    return axiosInstance.post(`profile`, data);
  },
  updateUserAvatar(avatarURL: string | null) {
    return axiosInstance.patch("/profile", { avatarUrl: avatarURL });
  },
};
export default profileManager;
