import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'https://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
=======
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
>>>>>>> b4c6797 (Authentication)
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
<<<<<<< HEAD
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

=======
});

>>>>>>> b4c6797 (Authentication)
export default api;
