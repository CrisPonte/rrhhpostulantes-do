import api from './api';

const getPortales = async () => {
    const response = await api.get('/portales');
    return response.data;
};

const getPuestos = async () => {
    const response = await api.get('/puestos');
    return response.data;
};

const getTitulos = async () => {
    const response = await api.get('/titulos');
    return response.data;
};

const getRoles = async () => {
    const response = await api.get('/roles');
    return response.data;
};

const supportService = {
    getPortales,
    getPuestos,
    getTitulos,
    getRoles
};

export default supportService;
