const BaseRepository = require('./BaseRepository');

class MongoRepository extends BaseRepository {
    constructor(model) {
        super();
        this.model = model;
    }

    async findById(id) {
        return await this.model.findOne({ _id: id, deleted: false }).exec();
    }

    async findAll(query = {}) {
        // Default to only not deleted
        const sanitizedQuery = { ...query, deleted: false };
        return await this.model.find(sanitizedQuery).exec();
    }

    async create(data) {
        const document = new this.model(data);
        return await document.save();
    }

    async update(id, data) {
        data.updatedAt = new Date();
        return await this.model.findOneAndUpdate(
            { _id: id, deleted: false },
            { $set: data },
            { new: true } // Return modified document
        ).exec();
    }

    async softDelete(id, userId) {
        return await this.model.findOneAndUpdate(
            { _id: id, deleted: false },
            {
                $set: {
                    deleted: true,
                    deletedAt: new Date(),
                    deletedBy: userId
                }
            },
            { new: true }
        ).exec();
    }

    async hardDelete(id, userId) {
        // We mark it physically deleted so the UI knows or we could use `.deleteOne()` depending on exact "baja física" interpretation.
        // In many audit systems, hard delete is actual destructive delete.
        // The RFP says "la eliminación física incluye el borrado de la carpeta de documentos del postulante". For now, we actually delete from DB.
        return await this.model.deleteOne({ _id: id }).exec();
    }
}

module.exports = MongoRepository;
