import axios from "axios";
import { feedFunctions } from "./feeds";
import { articleFunctions } from "./article";
import { uploadFumctions } from "./uploads";
import { authFunctions } from "./auth";

const baseHeaders = {
  common: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const baseClient = axios.create({
  headers: {
    ...baseHeaders,
  },
  withCredentials: true,
  baseURL: `/api`,
});

export const uploadClient = axios.create({
  headers: { "Content-Type": "multipart/form-data" },
  baseURL: `/api`,
});

// Add interceptor to baseClient
baseClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login');
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);

const API = {
  feed: feedFunctions,
  article: articleFunctions,
  upload: uploadFumctions,
  auth: authFunctions,
};

export default API;
