const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear una instancia de Express
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si usas otro usuario
    password: '', // Cambia esto si tienes contraseña
    database: 'ecoturismo'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Rutas CRUD

// Obtener todos los clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Obtener un cliente por ID
app.get('/clientes/:id', (req, res) => {
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(results[0]);
    });
});

// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const { nombre, apellido, email, telefono, direccion } = req.body;
    const sql = 'INSERT INTO clientes (nombre, apellido, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, email, telefono, direccion], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Cliente creado', id: result.insertId });
    });
});

// Actualizar un cliente
app.put('/clientes/:id', (req, res) => {
    const { nombre, apellido, email, telefono, direccion } = req.body;
    const sql = 'UPDATE clientes SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?';
    db.query(sql, [nombre, apellido, email, telefono, direccion, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado' });
    });
});

// Eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    const sql = 'DELETE FROM clientes WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});