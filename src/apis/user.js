import { axiosInstance } from '../config/axios';

export const loginApi = (body) => axiosInstance.post('user/login', body);
