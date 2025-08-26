import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4040/api",
    withCredentials: true,
});