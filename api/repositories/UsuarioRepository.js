const MongoRepository = require('./MongoRepository');
const Usuario = require('../models/Usuario'); // Using Mongoose model directly as default implementation

class UsuarioRepository extends MongoRepository {
    constructor() {
        super(Usuario);
    }

    async findByEmail(email) {
        return await this.model.findOne({ email, deleted: false }).populate('rol').exec();
    }
}

// In the future, if process.env.DB_TYPE === 'postgres', we would return a Postgres version.
module.exports = UsuarioRepository;
