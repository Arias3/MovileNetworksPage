require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Para PostgreSQL (o usa mysql2 para MySQL)

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de RDS (PostgreSQL)
const pool = new Pool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  port: process.env.RDS_PORT,
});

// Ruta de Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const result = await pool.query(query, [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta de Registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [username, email, password]);
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});