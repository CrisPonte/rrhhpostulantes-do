const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const PostulanteSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    // Basic info
    apellido: { type: String, required: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    dni: { type: String, required: true, unique: true, trim: true },
    edad: { type: Number },
    provincia: {
        type: String,
        enum: [
            'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
            'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
            'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
            'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
            'Tierra del Fuego', 'Tucumán'
        ],
        trim: true
    },
    telefono: { type: String, trim: true },
    telefonoContacto: { type: String, trim: true },
    personaContacto: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    fechaNacimiento: { type: Date },
    lugarNacimiento: { type: String, trim: true },
    estadoCivil: { type: String, trim: true },
    nacionalidad: { type: String, trim: true },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'No Binario', 'Sin Categorizar'],
        default: 'Sin Categorizar'
    },

    // Studies info
    tituloPrincipal: { type: String, ref: 'Titulo' },
    universidad: { type: String, trim: true },
    tituloSecundario: { type: String, trim: true },
    tituloPosgrado: { type: String, trim: true },
    tituloTerciario: { type: String, trim: true },

    // Job role
    puesto: { type: String, ref: 'Puesto' }, // Added to link to puesto, though RFP didn't explicitly map the nested object but dashboard requires classifying by puesto.

    // Interview info
    horaEntrevista: { type: String, trim: true }, // Or Date, string is safer if it's just '14:30'
    asistenciaEntrevista: {
        type: String,
        enum: ['Presenta', 'Ausente', 'Sin Categorizar'],
        default: 'Sin Categorizar'
    },
    estadoEntrevista: {
        type: String,
        enum: ['Confirma', 'Desiste', 'No Responde', 'Volver A Contactar', 'Sin Categorizar'],
        default: 'Sin Categorizar'
    },
    estadoContacto: {
        type: String,
        enum: ['Contactado', 'Sin Contactar'],
        default: 'Sin Contactar'
    },
    resultadoEntrevista: {
        type: String,
        enum: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo', 'Sin Calificar'],
        default: 'Sin Calificar'
    },
    referenciaBusqueda: { type: String, trim: true },
    portalBusqueda: { type: String, ref: 'Portal' },
    evaluacionCv: {
        type: String,
        enum: ['Aprobado', 'No Aprobado', 'Sin Categorizar'],
        default: 'Sin Categorizar'
    },
    fechaAprobacionCv: { type: Date },
    resultadoFinal: {
        type: String,
        enum: ['Aprobado', 'No Aprobado', 'Sin Categorizar'],
        default: 'Sin Categorizar'
    },
    observaciones: { type: String, trim: true },

    // Additional info references (Files are handled physically, we can just optionally store names or URLs here)
    documentos: [{ type: String }],
    fotoFila: { type: String },

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

module.exports = mongoose.model('Postulante', PostulanteSchema);
