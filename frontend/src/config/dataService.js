import axios from "axios";
import { store } from "../redux/app/store";

// Dev server
// const API_ENDPOINT = "https://stellarxplutope.appworkdemo.com/api/";
// export const ImageURL = "https://stellarxplutope.appworkdemo.com/api/public/";

// Live server
const API_ENDPOINT = "https://merchant.plutope.app/api";
export const ImageURL = "https://merchant.plutope.app/api/public/";

// local server
// const API_ENDPOINT = "http://localhost:3061/api/";
// export const ImageURL = "http://localhost:3061/api/public/";

const dataService = axios.create({
  baseURL: API_ENDPOINT,
});

dataService.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.admin?.adminToken;
    if (token) {
      config.headers.auth = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default dataService;
