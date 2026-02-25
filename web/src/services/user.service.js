import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = authService.getToken();
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

const getAll = async () => {
    const response = await axios.get(`${API_URL}/usuarios`, getHeaders());
    return response.data;
};

const create = async (userData) => {
    const response = await axios.post(`${API_URL}/usuarios`, userData, getHeaders());
    return response.data;
};

const update = async (id, userData) => {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, userData, getHeaders());
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`, getHeaders());
    return response.data;
};

const resetPassword = async (id, newPassword) => {
    const response = await axios.post(`${API_URL}/usuarios/${id}/reset-password`, { newPassword }, getHeaders());
    return response.data;
};

const changePassword = async (currentPassword, newPassword) => {
    const response = await axios.post(`${API_URL}/usuarios/change-password`, { currentPassword, newPassword }, getHeaders());
    return response.data;
};

const toggleStatus = async (id) => {
    const response = await axios.patch(`${API_URL}/usuarios/${id}/toggle-status`, {}, getHeaders());
    return response.data;
};

const userService = {
    getAll,
    create,
    update,
    deleteUser,
    resetPassword,
    changePassword,
    toggleStatus
};

export default userService;
