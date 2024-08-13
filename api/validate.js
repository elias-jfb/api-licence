// api/validate.js
import { Client } from 'pg';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { licenseKey } = req.body;

    if (!licenseKey) {
        return res.status(400).json({ error: 'Clave de licencia requerida' });
    }

    // Configuración de la conexión a PostgreSQL
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM licenses WHERE licencia = $1', [licenseKey]);
        await client.end();

        if (result.rows.length > 0) {
            const license = result.rows[0];
            if (license.activada) {
                return res.status(200).json({ valid: true });
            } else {
                return res.status(403).json({ valid: false });
            }
        } else {
            return res.status(404).json({ valid: false });
        }
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}
