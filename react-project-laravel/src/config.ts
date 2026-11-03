import axios from "axios";
import { checkToken } from "./utils/auth.ts";

// local
export const baseApiUrl = "http://localhost/react-project-api_mam/api";
export const basePath = "http://localhost/react-project-api_mam/";

// hosting
// export const baseApiUrl = "https://example.com/api";
// export const basePath = "https://example.com/api";

export const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
    

  },
});

api.interceptors.request.use((config) => {
  const token = checkToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});