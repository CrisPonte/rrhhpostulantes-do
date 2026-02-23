class BaseRepository {
    constructor() {
        if (new.target === BaseRepository) {
            throw new TypeError("Cannot construct BaseRepository instances directly");
        }
    }

    async findById(id) { throw new Error('Method not implemented'); }
    async findAll(query) { throw new Error('Method not implemented'); }
    async create(data) { throw new Error('Method not implemented'); }
    async update(id, data) { throw new Error('Method not implemented'); }
    async softDelete(id, userId) { throw new Error('Method not implemented'); }
    async hardDelete(id, userId) { throw new Error('Method not implemented'); }
}

module.exports = BaseRepository;
