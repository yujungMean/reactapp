import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '',
    withCredentials: true,  // 쿠키 자동 포함 (JWT 토큰)
});

export default axiosInstance;