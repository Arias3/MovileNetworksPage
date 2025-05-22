import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (usernameError || emailError) {
      setError('Corrige los errores antes de continuar');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setShowDialog(true);
      } else {
        setError(data.message || data.error || 'Error al registrar');
      }
    } catch {
      setError('Error de conexión');
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate('/home');
  };

  return (
    <div className="register-container">
      {showDialog && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <h2>¡Registro exitoso!</h2>
            <p>Usuario creado correctamente.</p>
            <button className="modal-btn" onClick={handleDialogClose}>
              Ir a inicio
            </button>
          </div>
        </div>
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            setUsernameError('');
            e.target.setCustomValidity('');
          }}
          onBlur={async (e) => {
            if (!username) return;
            try {
              const response = await fetch(`http://localhost:5000/check-username?username=${encodeURIComponent(username)}`);
              const data = await response.json();
              if (data.exists) {
                setUsernameError('El usuario ya está registrado');
                e.target.setCustomValidity('El usuario ya está registrado');
              } else {
                setUsernameError('');
                e.target.setCustomValidity('');
              }
            } catch {
              setUsernameError('No se pudo validar el usuario');
              e.target.setCustomValidity('No se pudo validar el usuario');
            }
          }}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setEmailError('');
            e.target.setCustomValidity('');
          }}
          onBlur={async (e) => {
            if (!email) return;
            try {
              const response = await fetch(`http://localhost:5000/check-email?email=${encodeURIComponent(email)}`);
              const data = await response.json();
              if (data.exists) {
                setEmailError('El correo ya está registrado');
                e.target.setCustomValidity('El correo ya está registrado');
              } else {
                setEmailError('');
                e.target.setCustomValidity('');
              }
            } catch {
              setEmailError('No se pudo validar el correo');
              e.target.setCustomValidity('No se pudo validar el correo');
            }
          }}
          required
        />
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Crear cuenta</button>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}