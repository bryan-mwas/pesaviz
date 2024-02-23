import axios from "axios";
import { API_URL } from "../utils/constant";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
