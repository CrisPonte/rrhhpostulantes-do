import api from './api';

const getPostulantes = async (filters = {}) => {
    const response = await api.get('/postulantes', {
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

    const byResultadoFinal = all.reduce((acc, curr) => {
        const resultado = curr.resultadoFinal || 'Sin Categorizar';
        acc[resultado] = (acc[resultado] || 0) + 1;
        return acc;
    }, {});

    const byEstadoContacto = all.reduce((acc, curr) => {
        const contacto = curr.estadoContacto || 'Sin Contactar';
        acc[contacto] = (acc[contacto] || 0) + 1;
        return acc;
    }, {});

    const byDesempeno = all.reduce((acc, curr) => {
        const resultado = curr.resultadoEntrevista || 'Sin Calificar';
        acc[resultado] = (acc[resultado] || 0) + 1;
        return acc;
    }, {});

    return { byProvincia, byEstado, byPuesto, byTituloOriginal, byResultadoFinal, byEstadoContacto, byDesempeno, total: all.length };
};

const statsService = {
    getPostulantes,
    getStats
};

export default statsService;
