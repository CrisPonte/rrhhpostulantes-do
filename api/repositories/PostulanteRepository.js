const MongoRepository = require('./MongoRepository');
const Postulante = require('../models/Postulante');

class PostulanteRepository extends MongoRepository {
    constructor() {
        super(Postulante);
    }

    async search(filters = {}) {
        const query = { deleted: false };

        // Advanced search filters
        if (filters.apellido) query.apellido = { $regex: filters.apellido, $options: 'i' };
        if (filters.nombre) query.nombre = { $regex: filters.nombre, $options: 'i' };
        if (filters.dni) query.dni = filters.dni;
        if (filters.provincia) query.provincia = filters.provincia;
        if (filters.puesto) query.puesto = filters.puesto;
        if (filters.tituloPrincipal) query.tituloPrincipal = filters.tituloPrincipal;
        if (filters.asistenciaEntrevista) query.asistenciaEntrevista = filters.asistenciaEntrevista;
        if (filters.estadoEntrevista) query.estadoEntrevista = filters.estadoEntrevista;
        if (filters.estadoContacto) query.estadoContacto = filters.estadoContacto;
        if (filters.resultadoEntrevista) query.resultadoEntrevista = filters.resultadoEntrevista;
        if (filters.resultadoFinal) query.resultadoFinal = filters.resultadoFinal;
        if (filters.portalBusqueda) query.portalBusqueda = filters.portalBusqueda;
        if (filters.referenciaBusqueda) query.referenciaBusqueda = { $regex: filters.referenciaBusqueda, $options: 'i' };

        // Range filter for dates if provided
        if (filters.fechaEntrevistaDesde || filters.fechaEntrevistaHasta) {
            query.fechaEntrevista = {};
            if (filters.fechaEntrevistaDesde) query.fechaEntrevista.$gte = new Date(filters.fechaEntrevistaDesde);
            if (filters.fechaEntrevistaHasta) query.fechaEntrevista.$lte = new Date(filters.fechaEntrevistaHasta);
        }

        return await this.model.find(query)
            .populate('puesto')
            .populate('tituloPrincipal')
            .populate('portalBusqueda')
            .exec();
    }
}

module.exports = PostulanteRepository;
