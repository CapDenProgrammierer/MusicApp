import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleLogin = async () => {
        try {
            // Enviar los datos correctos al backend
            const response = await axios.post("http://localhost:5279/api/Usuarios/login", {
                UserName: username, // Asegúrate de que coincida con el modelo del backend
                Password: password, // Asegúrate de que coincida con el modelo del backend
            });

            // Si el inicio de sesión es exitoso, llama a onLogin con los datos del usuario
            onLogin(response.data);

            // Redirigir a la página principal
            navigate("/"); // Redirige al usuario a la página principal
        } catch (err) {
            // Manejar errores con mensajes detallados
            if (err.response && err.response.status === 401) {
                setError("Contraseña incorrecta. Por favor, verifica tus credenciales.");
            } else if (err.response && err.response.status === 404) {
                setError("Usuario no encontrado. Por favor, verifica el nombre de usuario.");
            } else {
                setError("Error al iniciar sesión. Intenta nuevamente más tarde.");
            }
        }
    };

    return (
        <div>
            <h1>Inicio de Sesión</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <label>
                    Usuario:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;
