require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Usuario = require('./models/Usuario');

async function test() {
    await connectDB();
    const users = await Usuario.find({});
    for (const user of users) {
        console.log(`User: ${user.email}`);
        console.log(`Hash in DB: ${user.password}`);
        const testPass = '123456';
        const match = await bcrypt.compare(testPass, user.password);
        console.log(`Match with '123456': ${match}`);
        console.log('---');
    }
    process.exit(0);
}

test();
