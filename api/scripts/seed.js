require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

// Models
const Rol = require('../models/Rol');
const Usuario = require('../models/Usuario');
const Portal = require('../models/Portal');
const Puesto = require('../models/Puesto');
const Titulo = require('../models/Titulo');

const seedData = async () => {
    try {
        await connectDB();
        console.log('Seeding process started...');

        // 1. Roles & Usuarios
        console.log('Dropping/Clearing Rol and Usuario collections (if any)...');
        await Rol.deleteMany({});
        await Usuario.deleteMany({});

        const rolesData = [
            { nombre: 'admin', descripcion: 'Control total de la aplicación' },
            { nombre: 'jefe de rrhh', descripcion: 'Gestión total sin permisos destructivos' },
            { nombre: 'staff', descripcion: 'Nivel de lectura y operaciones visuales' }
        ];

        const createdRoles = await Rol.insertMany(rolesData);
        console.log(`Created ${createdRoles.length} roles.`);

        const passwordHash = await bcrypt.hash('123456', parseInt(process.env.BCRYPT_SALT) || 10);

        const usersData = [
            {
                nombre: 'Admin',
                apellido: 'System',
                email: 'admin@hr-talent.local',
                password: passwordHash,
                rol: createdRoles.find(r => r.nombre === 'admin')._id
            },
            {
                nombre: 'Jefe',
                apellido: 'RRHH',
                email: 'jefe@hr-talent.local',
                password: passwordHash,
                rol: createdRoles.find(r => r.nombre === 'jefe de rrhh')._id
            },
            {
                nombre: 'Staff',
                apellido: 'Member',
                email: 'staff@hr-talent.local',
                password: passwordHash,
                rol: createdRoles.find(r => r.nombre === 'staff')._id
            }
        ];

        await Usuario.insertMany(usersData);
        console.log('Created 3 default users. Passwords are "123456" for all:');
        usersData.forEach(u => console.log(`- ${u.email}`));

        // 2. Support Data: Portales
        console.log('Dropping/Clearing Portal collection...');
        await Portal.deleteMany({});
        const portalesData = [
            { nombre: 'Pandape' },
            { nombre: 'Linkedin' },
            { nombre: 'ManPower' },
            { nombre: 'Referenciado' }
        ];
        await Portal.insertMany(portalesData);
        console.log('Created Portales defaults.');

        // 3. Support Data: Puestos (Subset for seeding)
        console.log('Dropping/Clearing Puesto collection...');
        await Puesto.deleteMany({});
        const puestosData = [
            { nombre: 'SUPERVISOR DE PRODUCCIÓN' },
            { nombre: 'AUDITOR DE CALIDAD' },
            { nombre: 'AUTOMATIZACION' },
            { nombre: 'GERENTE DE COMPRAS' },
            { nombre: 'DESARROLLADOR SOFTWARE' },
            { nombre: 'GERENTE DE MANTENIMIENTO' }
        ];
        await Puesto.insertMany(puestosData);
        console.log('Created sample Puestos.');

        // 4. Support Data: Títulos (Subset for seeding)
        console.log('Dropping/Clearing Titulo collection...');
        await Titulo.deleteMany({});
        const titulosData = [
            { nombre: 'INGENIERO ELECTRONICO' },
            { nombre: 'INGENIERO INDUSTRIAL' },
            { nombre: 'DISEÑO INDUSTRIAL' },
            { nombre: 'TECNICO EN SISTEMAS' },
            { nombre: 'LICENCIADO EN ADMINISTRACION' }
        ];
        await Titulo.insertMany(titulosData);
        console.log('Created sample Títulos.');

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedData();
