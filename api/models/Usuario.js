const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const UsuarioSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    rol: { type: String, ref: 'Rol', required: true },
    activo: { type: Boolean, default: true },

    // Audit fields
    createdBy: { type: String },
    updatedBy: { type: String },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: String },
    physicalDeletedAt: { type: Date },
    physicalDeletedBy: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
