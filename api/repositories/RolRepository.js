const MongoRepository = require('./MongoRepository');
const Rol = require('../models/Rol');

class RolRepository extends MongoRepository {
    constructor() {
        super(Rol);
    }
}

module.exports = RolRepository;
