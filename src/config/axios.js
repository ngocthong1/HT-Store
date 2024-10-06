import axios from 'axios';
import { Toast } from '../components/toast/Toast';

export const axiosInstance = axios.create({
  baseURL:
    location.origin.includes('127.0.0.1') ||
    location.origin.includes('localhost')
      ? `http://${location.hostname}:3010/api`
      : `https://hts-backend-spvk.onrender.com/api`,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
    // Do something before request is sent
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      Toast('error', 'Your session has expired, please log in again.');
      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/';
      }, 1200);
    } else {
      return Promise.reject(error);
    }
  },
);
