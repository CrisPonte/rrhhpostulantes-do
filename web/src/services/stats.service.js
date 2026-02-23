import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getPostulantes = async (filters = {}) => {
    const token = authService.getToken();
    const response = await axios.get(`${API_URL}/postulantes`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
    });
    return response.data;
};

const getStats = async () => {
    const all = await getPostulantes();

    // Logic to calculate stats from all postulantes
    // In a real app, this might be a dedicated /stats endpoint

    const byProvincia = all.reduce((acc, curr) => {
        const prov = curr.provincia || 'Desconocido';
        acc[prov] = (acc[prov] || 0) + 1;
        return acc;
    }, {});

    const byEstado = all.reduce((acc, curr) => {
        const estado = curr.estadoEntrevista || 'Pendiente';
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;
    }, {});

    const byPuesto = all.reduce((acc, curr) => {
        const puesto = curr.puesto?.nombre || 'General';
        acc[puesto] = (acc[puesto] || 0) + 1;
        return acc;
    }, {});

    const byTituloOriginal = all.reduce((acc, curr) => {
        const titulo = curr.tituloPrincipal?.nombre || 'Sin título';
        acc[titulo] = (acc[titulo] || 0) + 1;
        return acc;
    }, {});

    return { byProvincia, byEstado, byPuesto, byTituloOriginal, total: all.length };
};

const statsService = {
    getPostulantes,
    getStats
};

export default statsService;
