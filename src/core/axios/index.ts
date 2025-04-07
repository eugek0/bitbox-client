import axios, { isAxiosError } from "axios";
import { SERVER_BASE_URL } from "../constants";

export const appAxios = axios.create();

appAxios.defaults.baseURL = SERVER_BASE_URL;
appAxios.defaults.withCredentials = true;

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error) || error.status !== 401) {
      throw error;
    }

    await axios.get(`${SERVER_BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });

    if (error.config) {
      return appAxios(error.config);
    }
  },
);
