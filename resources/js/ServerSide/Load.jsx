import axios from 'axios';

// CSRF token requirement removed as per requirement
// Using Laravel Sanctum for API authentication instead

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies in requests for Sanctum session authentication
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = {
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
    patch: api.patch,
};
