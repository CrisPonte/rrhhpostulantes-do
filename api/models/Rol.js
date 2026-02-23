const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const RolSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },

    // Audit fields
    createdBy: { type: String },
    updatedBy: { type: String },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: String },
    physicalDeletedAt: { type: Date },
    physicalDeletedBy: { type: String }
}, {
    timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Rol', RolSchema);
