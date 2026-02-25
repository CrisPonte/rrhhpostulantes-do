import api from './api';

const getAll = async (filters = {}) => {
    const response = await api.get('/postulantes', {
        params: filters
    });
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/postulantes/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post('/postulantes', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/postulantes/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`/postulantes/${id}`);
    return response.data;
};

const listFiles = async (id) => {
    const response = await api.get(`/postulantes/${id}/files`);
    return response.data;
};

const uploadFile = async (id, file) => {
    const formData = new FormData();
    formData.append('archivo', file);

    const response = await api.post(`/postulantes/${id}/files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const downloadFile = async (id, filename) => {
    const response = await api.get(`/postulantes/${id}/files/${filename}`, {
        responseType: 'blob' // Important for downloading files
    });

    // Create a link and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
};

const postulanteService = {
    getAll,
    getById,
    create,
    update,
    remove,
    listFiles,
    uploadFile,
    downloadFile
};

export default postulanteService;
