import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: '/api',
//     baseURL: `${BASE_URL}/api`
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;