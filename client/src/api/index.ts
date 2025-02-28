import axios from "axios";
import { feedFunctions } from "./feeds";
import { articleFunctions } from "./article";
import { uploadFunctions } from "./uploads";
import { authFunctions } from "./auth";
import { configFunctions } from "./config";
import { userFunctions } from "./user";
import { assetsFuntions } from "./assets";

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
  upload: uploadFunctions,
  auth: authFunctions,
  config: configFunctions,
  user: userFunctions,
  assets: assetsFuntions,
};

export default API;
