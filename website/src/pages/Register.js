import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Estilos específicos

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reemplaza con tu API que registra en RDS
      const response = await fetch('https://tu-api-backend.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.success) navigate('/'); // Redirige a login tras registro
      else setError(data.message || 'Error al registrar');
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear cuenta</button>
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}