import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // 👈 adjust to your backend URL
  withCredentials: true, // send cookies if using JWT in httpOnly cookie
});

export const registerUser = (data) => API.post("/signup", data);
export const loginUser = (data) => API.post("/signin", data);
export const logoutUser = () => API.post("/logout");