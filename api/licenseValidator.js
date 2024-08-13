const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function validateLicense() {
    const licenseFilePath = path.join(__dirname, 'license.txt');
    
    if (!fs.existsSync(licenseFilePath)) {
        console.error('El archivo license.txt no existe.');
        process.exit(1);
    }

    const licenseKey = fs.readFileSync(licenseFilePath, 'utf-8').trim();

    try {
        const response = await axios.post('https://tu-proyecto.vercel.app/api/validate', { licenseKey });
        if (response.data.valid) {
            console.log('Licencia válida.');
            return true;
        } else {
            console.error('Licencia inválida o inactiva.');
            process.exit(1);
        }
    } catch (error) {
        console.error('Error al validar la licencia:', error.message);
        process.exit(1);
    }
}

module.exports = { validateLicense };
