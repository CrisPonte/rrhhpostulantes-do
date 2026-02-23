const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const PortalSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    nombre: { type: String, required: true, trim: true },

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

module.exports = mongoose.model('Portal', PortalSchema);
