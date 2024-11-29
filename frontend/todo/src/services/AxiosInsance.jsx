import axios from "axios";

const axiosInstance  = axios.create({
    baseURL: "https://flask-react-todoapp-7c2rluse8-abdul-azees-projects.vercel.app/api/v1",
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