import axios from 'axios';
import authService from './auth.service';


const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = authService.getToken();
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

const getAll = async (filters = {}) => {
    const response = await axios.get(`${API_URL}/postulantes`, {
        ...getHeaders(),
        params: filters
    });
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${API_URL}/postulantes/${id}`, getHeaders());
    return response.data;
};

const create = async (data) => {
    const response = await axios.post(`${API_URL}/postulantes`, data, getHeaders());
    return response.data;
};

const update = async (id, data) => {
    const response = await axios.put(`${API_URL}/postulantes/${id}`, data, getHeaders());
    return response.data;
};

const remove = async (id) => {
    const response = await axios.delete(`${API_URL}/postulantes/${id}`, getHeaders());
    return response.data;
};

const listFiles = async (id) => {
    const response = await axios.get(`${API_URL}/postulantes/${id}/files`, getHeaders());
    return response.data;
};

const uploadFile = async (id, file) => {
    const formData = new FormData();
    formData.append('archivo', file);

    const config = getHeaders();
    config.headers['Content-Type'] = 'multipart/form-data';

    const response = await axios.post(`${API_URL}/postulantes/${id}/files`, formData, config);
    return response.data;
};

const downloadFile = async (id, filename) => {
    const response = await axios.get(`${API_URL}/postulantes/${id}/files/${filename}`, {
        ...getHeaders(),
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
