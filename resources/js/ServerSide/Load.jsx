import axios from 'axios';

// CSRF token requirement removed as per requirement
// Using Laravel Sanctum for API authentication instead

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies in requests for Sanctum session authentication
});

export const apiService = {
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
    patch: api.patch,
};
