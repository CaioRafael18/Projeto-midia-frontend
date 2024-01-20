import axios from "axios";

const api = axios.create({
    baseURL: 'https://projeto-midia-backend-s7dm.vercel.app'
});

const accessToken = 'seuTokenAqui';

api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;