import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Usamos el mismo estilo que Register

export default function Login() {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ejemplo de llamada a tu API (ajusta la URL)
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token); // Guarda el token
                navigate('/home');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Iniciar Sesión</h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
                {error && <p className="error-message">{error}</p>}
                <div className="login-link">
                    <span>¿No tienes cuenta?</span>
                    <button
                        type="button"
                        className="register-btn"
                        onClick={() => navigate('/register')}
                        style={{ marginLeft: '8px' }}
                    >
                        Regístrate
                    </button>
                </div>
            </form>
        </div>
    );
}