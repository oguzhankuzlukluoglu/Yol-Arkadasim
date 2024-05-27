import axios from 'axios';

// Axios instance oluşturma
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL'si
});

// İstek interceptor'ı ekleme
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // localStorage'dan token al
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Header'a token ekle
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const removeToken = () => {
    axiosInstance.interceptors.request.use((config) => {
      delete config.headers['Authorization'];
      return config;
    });
  };


export default axiosInstance;
