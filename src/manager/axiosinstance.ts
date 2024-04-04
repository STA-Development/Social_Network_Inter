import { getEnvironmentalVariables } from "../utils/getEnvironmentalVariables";
import axios, { AxiosInstance } from "axios";

const { REACT_APP_API_URL } = getEnvironmentalVariables();

class RequestManager {
  private static instance: AxiosInstance;
  static getCreateInstance(): AxiosInstance {
    const getServerUrl = () => REACT_APP_API_URL;

    const axiosInstance = axios.create({ baseURL: getServerUrl() });

    axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        config.headers.set({
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        });

        if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json";
        }

        config["headers"]["Accept"] = "application/json; charset=utf-8";

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
    RequestManager.instance = axiosInstance;

    return axiosInstance;
  }
}

export const Axios = () => RequestManager.getCreateInstance();
