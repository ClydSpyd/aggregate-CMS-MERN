import axios from "axios";
import { feedFunctions } from "./feeds";
import { articleFunctions } from "./article";
import { uploadFumctions } from "./uploads";

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
  baseURL: `http://localhost:6969/api`,
  
});

export const uploadClient = axios.create({
  headers: { "Content-Type": "multipart/form-data" },
  baseURL: `http://localhost:6969/api`,
});

const API = {
  feed: feedFunctions,
  article: articleFunctions,
  upload: uploadFumctions,
};

export default API;
