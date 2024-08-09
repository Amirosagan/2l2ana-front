import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.2l2ana.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

export default api;
