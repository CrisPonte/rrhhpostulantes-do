const UsuarioRepository = require('./UsuarioRepository');
const RolRepository = require('./RolRepository');
const PuestoRepository = require('./PuestoRepository');
const TituloRepository = require('./TituloRepository');
const PortalRepository = require('./PortalRepository');
const PostulanteRepository = require('./PostulanteRepository');

// Future-proofing the repository pattern
const getRepository = (repoName) => {
    const dbType = process.env.DB_TYPE || 'mongodb';

    // Right now only MongoDB is implemented
    if (dbType === 'mongodb') {
        switch (repoName) {
            case 'Usuario': return new UsuarioRepository();
            case 'Rol': return new RolRepository();
            case 'Puesto': return new PuestoRepository();
            case 'Titulo': return new TituloRepository();
            case 'Portal': return new PortalRepository();
            case 'Postulante': return new PostulanteRepository();
            default: throw new Error(`Repository ${repoName} not implemented for ${dbType}`);
        }
    }

    throw new Error(`DB_TYPE ${dbType} not supported yet in repository factory`);
};

module.exports = {
    getRepository
};
