const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'licencias.db');
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

async function validateLicenseKey(licenseKey) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM licenses WHERE licencia = ? AND activada = 1`;
        db.get(query, [licenseKey], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row);
            }
        });
    });
}

module.exports = { validateLicenseKey };
