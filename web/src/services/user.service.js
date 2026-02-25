import api from './api';

const getAll = async () => {
    const response = await api.get('/usuarios');
    return response.data;
};

const create = async (userData) => {
    const response = await api.post('/usuarios', userData);
    return response.data;
};

const update = async (id, userData) => {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
};

const resetPassword = async (id, newPassword) => {
    const response = await api.post(`/usuarios/${id}/reset-password`, { newPassword });
    return response.data;
};

const changePassword = async (currentPassword, newPassword) => {
    const response = await api.post('/usuarios/change-password', { currentPassword, newPassword });
    return response.data;
};

const toggleStatus = async (id) => {
    const response = await api.patch(`/usuarios/${id}/toggle-status`, {});
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
