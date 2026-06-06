import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Attach Bearer token to every request automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'local-auth') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If the server returns 401, clear auth and redirect to sign-in
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/auth/signin';
        }
        return Promise.reject(err);
    }
);

export default API;
