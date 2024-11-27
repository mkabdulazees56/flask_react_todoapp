import axiosInstance from "./AxiosInsance";

export const login = (username, password) => axiosInstance.post("/auth/login", {username, password});
export const signup = (email, username, password) => axiosInstance.post("/auth/register", { email, username, password});
export const currentuser = (username, password) => axiosInstance.post("/auth/currentuser", {username, password});

