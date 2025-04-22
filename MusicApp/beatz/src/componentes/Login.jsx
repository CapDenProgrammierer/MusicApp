import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            // Ensure the correct fields are sent to the backend
            const response = await axios.post("http://localhost:5279/api/Usuarios/login", {
                userName: username, // Ensure this matches the backend's expected field
                password: password, // Ensure this matches the backend's expected field
            });

            // If login is successful, call onLogin with user data
            onLogin(response.data);
        } catch (err) {
            // Handle errors with detailed messages
            if (err.response && err.response.status === 401) {
                setError("Contraseña incorrecta. Por favor, verifica tus credenciales.");
            } else if (err.response && err.response.status === 404) {
                setError("Usuario no encontrado. Por favor, verifica el nombre de usuario.");
            } else {
                setError("Error al iniciar sesión. Intenta nuevamente más tarde.");
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate login logic
        const user = { id: 1, nombre: "Usuario Demo" }; // Replace with actual login logic
        onLogin(user);
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
