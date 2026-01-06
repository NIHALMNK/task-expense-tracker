import axios from "axios";
import { showError } from "../utils/toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Server error";

    showError(message);

    return Promise.reject(error);
  }
);

export default api;
