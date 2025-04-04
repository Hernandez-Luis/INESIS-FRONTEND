import axios from 'axios';
const API_URL = process.env.REACT_APP_API_UZACHI_URL;

const axiosInstance = axios.create({
    baseURL: API_URL, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
