import React, { useState } from "react";

function PlaylistSelectorModal({ isOpen, onClose, onSelectPlaylist, cancionId }) {
    const [playlistId, setPlaylistId] = useState(""); // Estado para almacenar el ID de la playlist ingresado
    const [error, setError] = useState(""); // Estado para manejar el mensaje de error

    const handleConfirm = async () => {
        if (!playlistId) {
            setError("Por favor, ingresa un ID de playlist válido.");
            return;
        }

        try {
            // Llama a la función para agregar la canción a la playlist
            await onSelectPlaylist(playlistId, cancionId);
            setError(""); // Limpia el mensaje de error si la operación es exitosa
            onClose(); // Cierra el modal
        } catch (err) {
            // Manejar errores del backend
            if (err.response && err.response.status === 400) {
                const backendMessage = err.response.data.Message || "Ocurrió un error.";
                setError(backendMessage); // Mostrar el mensaje devuelto por el backend
            } else {
                setError("Ocurrió un error al agregar la canción. Puede que esta ya este agregada.");
            }
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modalContent">
                <h2>Agregar a Playlist</h2>
                <p>Ingresa el ID de la playlist a la cual deseas agregar esta canción:</p>
                <input
                    type="number"
                    value={playlistId}
                    onChange={(e) => setPlaylistId(e.target.value)}
                    placeholder="ID de la playlist"
                />
                <div className="modalActions">
                    <button onClick={handleConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
            </div>
        </div>
    );
}

export default PlaylistSelectorModal;
