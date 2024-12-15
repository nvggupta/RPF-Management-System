import axios from 'axios';
import { useState } from 'react';


const axiosInstance = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_BASE_URL}/api`,
});

// Request interceptor to add the JWT token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
    // const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));    
    if (userInfo?.token) {
        config.headers.Authorization = `Bearer ${userInfo?.token}`;
    }
    return config;
    
}, (error) => {
return Promise.reject(error);
});

export default  axiosInstance;