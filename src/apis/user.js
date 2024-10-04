import { axiosInstance } from '../config/axios';

export const loginApi = (body) => axiosInstance.post('users/login', body);

export const registerApi = (body) => axiosInstance.post('users/register', body);
