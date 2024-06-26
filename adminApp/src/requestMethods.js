import axios from "axios";

// export const BASE_URL = "http://localhost:5000/api/";
export const BASE_URL = "http://212.113.120.58:5000/api/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
export const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {token:`Bearer ${TOKEN}`}
}); 

export const tokenRequest = {
  baseUrl: 'http://212.113.120.58:5000/api/',
  headers: {token:`Bearer ${TOKEN}`}
}