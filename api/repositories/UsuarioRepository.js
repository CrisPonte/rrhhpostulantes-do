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

    async findByAlias(alias) {
        return await this.model.findOne({ alias: alias.toLowerCase(), deleted: false }).populate('rol').exec();
    }

    async suggestUniqueAlias(nombre, apellido) {
        if (!nombre || !apellido) return null;

        const cleanNombre = nombre.trim().toLowerCase();
        const cleanApellido = apellido.trim().split(' ')[0].toLowerCase();

        let alias = cleanNombre.charAt(0) + cleanApellido;

        let exists = await this.model.findOne({ alias });
        if (!exists) return alias;

        // Try with second letter of name
        if (cleanNombre.length > 1) {
            alias = cleanNombre.substring(0, 2) + cleanApellido;
            exists = await this.model.findOne({ alias });
            if (!exists) return alias;
        }

        // Try with full name
        alias = cleanNombre + cleanApellido;
        exists = await this.model.findOne({ alias });
        if (!exists) return alias;

        // Try adding numbers
        let counter = 1;
        while (exists) {
            alias = cleanNombre.charAt(0) + cleanApellido + counter;
            exists = await this.model.findOne({ alias });
            counter++;
        }

        return alias;
    }
}

// In the future, if process.env.DB_TYPE === 'postgres', we would return a Postgres version.
module.exports = UsuarioRepository;
