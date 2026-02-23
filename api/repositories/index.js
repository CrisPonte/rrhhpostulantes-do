const UsuarioRepository = require('./UsuarioRepository');

// Future-proofing the repository pattern
const getRepository = (repoName) => {
    const dbType = process.env.DB_TYPE || 'mongodb';

    // Right now only MongoDB is implemented, 
    // but here is where the switch would happen based on dbType.
    if (repoName === 'Usuario') {
        return new UsuarioRepository();
    }

    throw new Error(`Repository ${repoName} not implemented for ${dbType}`);
};

module.exports = {
    getRepository
};
