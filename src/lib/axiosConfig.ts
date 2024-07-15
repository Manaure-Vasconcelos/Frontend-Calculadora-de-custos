import axios from 'axios';
import { parseCookies } from 'nookies';

const { access_token } = parseCookies();

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

if (access_token) {
  api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
}

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
