import axios from "axios";

const axiosInstance = axios.create({
  baseUrl: "http://localhost:9000/api",
  // headers:
});

export default axiosInstance;
