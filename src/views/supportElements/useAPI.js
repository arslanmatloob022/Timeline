import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;


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
  
      config.headers.Authorization = `Token ${this.$store.state.token}`;
    
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
