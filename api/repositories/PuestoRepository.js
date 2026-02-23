const MongoRepository = require('./MongoRepository');
const Puesto = require('../models/Puesto');

class PuestoRepository extends MongoRepository {
    constructor() {
        super(Puesto);
    }
}

module.exports = PuestoRepository;
