const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { validateLicenseKey } = require('../db'); // Asegúrate de ajustar la ruta según tu estructura de proyecto

app.use(bodyParser.json());

app.post('/validate', async (req, res) => {
    const { licenseKey } = req.body;

    if (!licenseKey) {
        return res.status(400).json({ message: 'License key is required' });
    }

    try {
        const isValid = await validateLicenseKey(licenseKey);
        if (isValid) {
            res.status(200).json({ valid: true });
        } else {
            res.status(401).json({ valid: false, message: 'Invalid or inactive license key' });
        }
    } catch (error) {
        res.status(500).json({ valid: false, message: 'Server error' });
    }
});

module.exports = app;
