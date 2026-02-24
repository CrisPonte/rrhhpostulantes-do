import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
    const token = authService.getToken();
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

const getPortales = async () => {
    const response = await axios.get(`${API_URL}/portales`, getHeaders());
    return response.data;
};

const getPuestos = async () => {
    const response = await axios.get(`${API_URL}/puestos`, getHeaders());
    return response.data;
};

const getTitulos = async () => {
    const response = await axios.get(`${API_URL}/titulos`, getHeaders());
    return response.data;
};

const supportService = {
    getPortales,
    getPuestos,
    getTitulos
};

export default supportService;
