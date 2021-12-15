import axios, { AxiosProxyConfig } from "axios";

export const API = axios.create({
  baseURL: "http://api.coingecko.com/api/v3/coins/",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  responseType: "json",
});

export default axios;
