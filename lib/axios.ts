import { BASE_HTTP } from "@/utils/constants";
import axios from "axios";

export default axios.create({
  baseURL: BASE_HTTP,
});

export const axiosAuth = axios.create({
  baseURL: BASE_HTTP,
  headers: { "Content-Type": "application/json" },
});
