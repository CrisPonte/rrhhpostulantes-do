const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UsuarioSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    rol: { type: String, ref: 'Rol', required: true },

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
