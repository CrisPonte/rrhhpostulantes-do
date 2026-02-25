import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL
});

// Request interceptor: add auth token
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle token expiration (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only redirect if it's a 401 and not a login request
        if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            // Force reload to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
