// api/license.js
const { Pool } = require('pg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de la base de datos (con la cadena de conexión proporcionada)
const pool = new Pool({
    connectionString: 'postgres://default:Ry5PDh1jXfnr@ep-patient-dream-a4yif5es.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(bodyParser.json());

app.post('/validate', async (req, res) => {
    const { licenseKey } = req.body;

    if (!licenseKey) {
        return res.status(400).json({ message: 'License key is required' });
    }

    try {
        const result = await pool.query('SELECT * FROM licenses WHERE licencia = $1', [licenseKey]);
        if (result.rows.length > 0 && result.rows[0].activada) {
            res.status(200).json({ valid: true });
        } else {
            res.status(401).json({ valid: false, message: 'Invalid or inactive license key' });
        }
    } catch (error) {
        res.status(500).json({ valid: false, message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
