// import axios from "axios"

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Add a request interceptor to add the auth token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Add a response interceptor to handle 401 Unauthorized responses
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Auto logout if 401 response returned from api
//       localStorage.removeItem("token")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export default api

// const API_BASE_URL = "https://hitesh0404.pythonanywhere.com/"; // Update with your backend URL
import axios from "axios";

<<<<<<< HEAD
// const API_BASE_URL = "https://hitesh0404.pythonanywhere.com/"; // Update with your backend URL
=======
>>>>>>> main
const API_BASE_URL = "http://127.0.0.1:8000/"; // or your production URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if exists
const access = localStorage.getItem("access");
if (access) {
  api.defaults.headers.common["Authorization"] = `Bearer ${access.trim()}`;
}

export default api;
