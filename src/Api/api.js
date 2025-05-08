// src/api/api.js

import axios from "axios";

// Base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // 🔥 Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example if you use tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error11" , error)
    return Promise.reject(error);
    
  }
);

// Generic API methods
const apiClient = {
  get: (url, params = {}, config = {}) =>
    api.get(url, { params, ...config }),

  post: (url, data = {}, config = {}) =>
    api.post(url, data, { ...config }),

  put: (url, data = {}, config = {}) =>
    api.put(url, data, { ...config }),

  delete: (url, config = {}) =>
    api.delete(url, { ...config }),
};

export default apiClient;
