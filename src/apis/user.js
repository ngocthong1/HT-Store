import { axiosInstance } from '../config/axios';

export const loginApi = (body) => axiosInstance.post('user/login', body);

export const registerApi = (body) => axiosInstance.post('user/register', body);
