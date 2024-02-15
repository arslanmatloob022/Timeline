import axios from "axios";
const { useUserSession } = require("/@src/stores/userSession");

const { VITE_API_BASE_URL } = import.meta.env;

const userSession = useUserSession();

let api = null;

function createApi() {
  const axiosInstance = axios.create({
    baseURL: VITE_API_BASE_URL || "https://vecel-practice.vercel.app",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    if (userSession.isLoggedIn) {
      config.headers.Authorization = `Bearer ${userSession.token}`;
    } else if (userSession.code) {
      config.headers.Authorization = userSession.code;
    }
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

module.exports = { useApi };
