require('dotenv').config();
const mongoose = require('mongoose');
const sql = require('mssql');
const { randomUUID } = require('crypto');

// Models
const Postulante = require('../models/Postulante');
const Puesto = require('../models/Puesto');
const Portal = require('../models/Portal');
const Titulo = require('../models/Titulo');
const connectDB = require('../config/db');

const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const normalizeEnum = (value, enumArray, defaultValue = 'Sin Categorizar') => {
    if (!value) return defaultValue;
    const cleanValue = value.toString().trim().toLowerCase();

    // Especial handling for common cases
    if (cleanValue === 'sin categorizar' || cleanValue === 'sin calificar' || cleanValue === 'null') return defaultValue;

    const found = enumArray.find(e => e.toLowerCase() === cleanValue);
    if (found) return found;

    // Try partial match or more complex logic if needed
    // For now, return default if not found in enum
    return defaultValue;
};

const parseDate = (value) => {
    if (!value) return undefined;
    if (value instanceof Date) return value;

    const dateStr = String(value).trim();
    if (!dateStr || dateStr.toLowerCase() === 'null') return undefined;

    // Handle DD/MM/YYYY
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
        const year = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        if (!isNaN(date.getTime())) return date;
    }

    // Try standard parsing
    const standardDate = new Date(dateStr);
    if (!isNaN(standardDate.getTime())) return standardDate;

    return undefined;
};

// Maps for caching IDs
let puestosMap = {};
let portalesMap = {};
let titulosMap = {};

async function getOrCreateRef(Model, map, stringValue) {
    if (!stringValue || typeof stringValue !== 'string') return null;
    const nameStr = stringValue.trim();
    if (!nameStr || nameStr.toUpperCase() === 'NULL') return null;

    const key = nameStr.toUpperCase();
    if (map[key]) return map[key];

    // Buscar existente case-insensitive
    let doc = await Model.findOne({ nombre: new RegExp('^' + nameStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') });
    if (!doc) {
        doc = await Model.create({ nombre: nameStr.toUpperCase() });
        console.log(`Created new ${Model.modelName}: ${nameStr}`);
    }
    map[key] = doc._id;
    return doc._id;
}

const importData = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');

        // Obtener datos desde la vista qryPostulantes
        console.log('Querying qryPostulantes...');
        const result = await sql.query`SELECT * FROM qryPostulantes WHERE Eliminado = 0 OR Eliminado IS NULL`;
        const records = result.recordset;
        console.log(`Found ${records.length} records in SQL view qryPostulantes`);

        // Enums from model
        const provinciasValidas = [
            'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
            'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
            'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
            'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
            'Tierra del Fuego', 'Tucumán'
        ];

        const generosValidos = ['Masculino', 'Femenino', 'No Binario', 'Sin Categorizar'];
        const asistenciaValida = ['Presenta', 'Ausente', 'Sin Categorizar'];
        const estadoEntrevistaValido = ['Confirma', 'Desiste', 'No Responde', 'Volver A Contactar', 'Sin Categorizar'];
        const estadoContactoValido = ['Contactado', 'Sin Contactar'];
        const evaluacionCvValida = ['Aprobado', 'No Aprobado', 'Sin Categorizar'];
        const resultadoFinalValido = ['Aprobado', 'No Aprobado', 'Sin Categorizar'];

        let importCount = 0;
        let updateCount = 0;
        let erroresCount = 0;

        // Limpiar para importación fresca (Usuario prefiere llenar, usualmente implica borrar previos si es migración)
        // Pero para ser más seguro, usaremos DNI como clave y haremos upsert si es necesario.
        // El usuario dijo "llena", así que asumimos que es una carga inicial o actualización.

        for (const row of records) {
            try {
                const dniStr = row.Dni ? String(row.Dni).trim() : `DNI-SQL-${row.ID || Math.floor(Math.random() * 1000000)}`;

                // Buscar referencias
                const puestoId = await getOrCreateRef(Puesto, puestosMap, row.Puesto);
                const portalId = await getOrCreateRef(Portal, portalesMap, row.Portal);
                const tituloId = await getOrCreateRef(Titulo, titulosMap, row.TituloPrincipal);

                const dataInsert = {
                    apellido: row.Apellido ? row.Apellido.trim() : 'Sin Apellido',
                    nombre: row.Nombre ? row.Nombre.trim() : 'Sin Nombre',
                    dni: dniStr,
                    edad: row.Edad ? parseInt(row.Edad) : undefined,
                    provincia: normalizeEnum(row.Provincia, provinciasValidas),
                    genero: normalizeEnum(row.Genero, generosValidos),
                    telefono: row.Telefono ? String(row.Telefono).trim() : undefined,
                    email: row.Email ? String(row.Email).trim().toLowerCase() : undefined,

                    puesto: puestoId,
                    portalBusqueda: portalId,
                    tituloPrincipal: tituloId,
                    universidad: row.Universidad,

                    evaluacionCv: normalizeEnum(row.EvaluacionCV, evaluacionCvValida),
                    fechaAprobacionCv: parseDate(row.FechaAprobacionCV),
                    estadoContacto: normalizeEnum(row.Contacto, estadoContactoValido, 'Sin Contactar'),
                    estadoEntrevista: normalizeEnum(row.EstadoEntrevista, estadoEntrevistaValido),
                    horaEntrevista: row.HoraEntrevista ? String(row.HoraEntrevista).trim() : undefined,
                    asistenciaEntrevista: normalizeEnum(row.Asistenciaentrevista, asistenciaValida),

                    resultadoFinal: normalizeEnum(row.ResultadoFinal, resultadoFinalValido),
                    referenciaBusqueda: row.ReferenciaBusqueda,
                    observaciones: row.Observaciones,

                    // Audit placeholder
                    createdBy: 'system-migration',
                    deleted: row.Eliminado || false
                };

                // Upsert por DNI
                const existing = await Postulante.findOne({ dni: dniStr });
                if (existing) {
                    await Postulante.findByIdAndUpdate(existing._id, dataInsert);
                    updateCount++;
                } else {
                    await Postulante.create(dataInsert);
                    importCount++;
                }

                if ((importCount + updateCount) % 50 === 0) {
                    console.log(`Processed ${importCount + updateCount} records...`);
                }
            } catch (err) {
                console.error(`Error processing record SQL:`, row.Dni || row.Nombre, err.message);
                erroresCount++;
            }
        }

        console.log(`\nImportación finalizada!`);
        console.log(`- Insertados nuevos: ${importCount}`);
        console.log(`- Actualizados: ${updateCount}`);
        console.log(`- Errores: ${erroresCount}`);

    } catch (err) {
        console.error('Migration Error:', err);
    } finally {
        await sql.close();
        mongoose.connection.close();
        process.exit(0);
    }
};

importData();
