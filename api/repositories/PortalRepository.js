const MongoRepository = require('./MongoRepository');
const Portal = require('../models/Portal');

class PortalRepository extends MongoRepository {
    constructor() {
        super(Portal);
    }
}

module.exports = PortalRepository;
