import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `http://${location.hostname}:3010/api`
});
// Đơn giản hóa: Chỉ đính kèm token vào header
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
);
