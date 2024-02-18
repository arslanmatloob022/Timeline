import axios from "axios";
import store from "../store";

let api = null;

function createApi() {
  const axiosInstance = axios.create({
    baseURL: "https://vecel-practice.vercel.app",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Token ${store.state.token}`;

    return config;
  });

  return axiosInstance;
}

function useApi() {
  if (!api) {
    api = createApi();
  }
  return api;
}

export default useApi;
