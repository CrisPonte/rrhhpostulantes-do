const GenericController = require('./GenericController');

class RolController extends GenericController {
    constructor() {
        super('Rol');
    }
}

module.exports = new RolController();
