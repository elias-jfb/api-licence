// initDatabase.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'licencias.db');
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        process.exit(1);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear la tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS licenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        licencia TEXT NOT NULL,
        activada BOOLEAN NOT NULL CHECK (activada IN (0, 1)),
        fecha_de_creacion TEXT NOT NULL,
        fecha_de_modificacion TEXT
    )
`, (err) => {
    if (err) {
        console.error('Error al crear la tabla:', err.message);
    } else {
        console.log('Tabla creada o ya existe.');
    }
    db.close();
});
