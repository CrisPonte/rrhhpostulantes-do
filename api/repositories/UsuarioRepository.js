const MongoRepository = require('./MongoRepository');
const Usuario = require('../models/Usuario'); // Using Mongoose model directly as default implementation

class UsuarioRepository extends MongoRepository {
    constructor() {
        super(Usuario);
    }

    async findAll(query = {}) {
        const sanitizedQuery = { ...query, deleted: false };
        return await this.model.find(sanitizedQuery).populate('rol').exec();
    }

    async findById(id) {
        return await this.model.findOne({ _id: id, deleted: false }).populate('rol').exec();
    }

    async findByEmail(email) {
        return await this.model.findOne({ email, deleted: false }).populate('rol').exec();
    }
}

// In the future, if process.env.DB_TYPE === 'postgres', we would return a Postgres version.
module.exports = UsuarioRepository;
