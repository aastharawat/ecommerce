import axios from "axios";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseUrl: "http://localhost:9000/api",
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

export default axiosInstance;
