const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/contactos', async (req, res) => {
    try {
        const response = await axios.get('http://www.raydelto.org/agenda.php');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener contactos', error });
    }
});

app.post('/contactos', async (req, res) => {
    const nuevoContacto = req.body;

    if (!nuevoContacto.nombre || !nuevoContacto.telefono) {
        return res.status(400).json({ message: 'Nombre y teléfono son requeridos' });
    }

    try {
        const response = await axios.post('http://www.raydelto.org/agenda.php', nuevoContacto);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el contacto', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
