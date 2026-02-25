const MongoRepository = require('./MongoRepository');
const Postulante = require('../models/Postulante');

class PostulanteRepository extends MongoRepository {
    constructor() {
        super(Postulante);
    }

    async search(filters = {}) {
        const query = { deleted: false };
        const page = filters.page ? parseInt(filters.page) : 1;
        const limit = filters.limit ? parseInt(filters.limit) : null;
        const skip = limit ? (page - 1) * limit : 0;

        // Advanced search filters
        if (filters.apellido) query.apellido = { $regex: filters.apellido, $options: 'i' };
        if (filters.nombre) query.nombre = { $regex: filters.nombre, $options: 'i' };
        if (filters.dni) query.dni = { $regex: filters.dni, $options: 'i' };
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

        const dbQuery = this.model.find(query)
            .populate('puesto')
            .populate('tituloPrincipal')
            .populate('portalBusqueda')
            .sort({ createdAt: -1 });

        if (limit) {
            const total = await this.model.countDocuments(query);
            const items = await dbQuery.skip(skip).limit(limit).exec();
            return {
                items,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };
        }

        return await dbQuery.exec();
    }
}

module.exports = PostulanteRepository;
