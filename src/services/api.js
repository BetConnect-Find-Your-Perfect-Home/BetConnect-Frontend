import axios from 'axios';

const API = axios.create({
    // Replace 5000 with your actual backend port
    baseURL: 'http://localhost:5000/api', 
});

// This interceptor is correct—it attaches the 'key' to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;