import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || '/api';

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        sessionStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
};

const getToken = () => {
    return sessionStorage.getItem('token');
};

const authService = {
    login,
    logout,
    getCurrentUser,
    getToken
};

export default authService;
