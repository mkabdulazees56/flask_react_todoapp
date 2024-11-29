import axios from "axios";

const axiosInstance  = axios.create({
    baseURL: "http://127.0.0.1:5000/api/v1",
    headers: {
        "Content-Type": "application/json"
    },

});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default axiosInstance;