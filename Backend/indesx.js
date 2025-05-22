require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 5000;

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de RDS (MySQL)
const pool = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  port: process.env.RDS_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



// Ruta de Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE user = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    if (match) {
      const token = jwt.sign({ id: user.id, username: user.user }, JWT_SECRET, { expiresIn: '2h' });
      delete user.password; // Opcional: elimina la contraseña antes de enviar el usuario
      return res.json({ success: true, user, token });
    }

    delete user.password;
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/check-username', async (req, res) => {
  const { username } = req.query;
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE user = ?', [username]);
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ exists: false, error: err.message });
  }
});

app.get('/check-email', async (req, res) => {
  const { email } = req.query;
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE mail = ?', [email]);
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ exists: false, error: err.message });
  }
});

// Ruta de Registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Buscar si ya existe usuario o correo
    const [userRows] = await pool.query(
      'SELECT user, mail FROM users WHERE user = ? OR mail = ?',
      [username, email]
    );
    if (userRows.length > 0) {
      const existsUser = userRows.some(row => row.user === username);
      const existsMail = userRows.some(row => row.mail === email);
      let message = '';
      if (existsUser && existsMail) {
        message = 'El usuario y el correo ya están registrados';
      } else if (existsUser) {
        message = 'El usuario ya está registrado';
      } else if (existsMail) {
        message = 'El correo ya está registrado';
      }
      return res.status(400).json({ success: false, message });
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario con contraseña hasheada
    const [result] = await pool.query(
      'INSERT INTO users (user, mail, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res.json({ success: true, user: { id: result.insertId, user: username, mail: email } });
  } catch (err) {
    // Manejo de errores de duplicado de MySQL
    if (err.code === 'ER_DUP_ENTRY') {
      let message = 'Usuario o correo ya existente';
      if (err.message.includes('user')) {
        message = 'El usuario ya está registrado';
      } else if (err.message.includes('mail')) {
        message = 'El correo ya está registrado';
      }
      return res.status(400).json({ success: false, message });
    }
    // Otros errores
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});