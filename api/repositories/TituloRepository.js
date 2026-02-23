const MongoRepository = require('./MongoRepository');
const Titulo = require('../models/Titulo');

class TituloRepository extends MongoRepository {
    constructor() {
        super(Titulo);
    }
}

module.exports = TituloRepository;
