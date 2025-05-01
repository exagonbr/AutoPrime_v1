import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle SSL certificate errors in development
api.interceptors.request.use((config) => {
  if (process.env.NODE_ENV === 'development') {
    config.httpsAgent = new axios.create().httpsAgent;
    config.httpsAgent.options = {
      ...config.httpsAgent.options,
      rejectUnauthorized: false // Allow self-signed certificates in development
    };
  }
  return config;
});

export default api;
