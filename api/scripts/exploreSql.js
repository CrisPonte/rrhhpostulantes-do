require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: false, // For testing against local/non-encrypted dev servers
        trustServerCertificate: true // Optional, depending on your SQL Server configuration
    }
};

async function explore() {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');

        // Let's get up to 5 rows to see what kind of data is there
        const result = await sql.query`SELECT TOP 5 * FROM qryPostulantes`;
        console.log("COLUMNS:");
        if (result.recordset.length > 0) {
            console.log(Object.keys(result.recordset[0]));
        }
        console.log("\nDATA (First Row):");
        console.log(result.recordset[0]);
    } catch (err) {
        console.error('SQL Error:', err);
    } finally {
        await sql.close();
    }
}

explore();
