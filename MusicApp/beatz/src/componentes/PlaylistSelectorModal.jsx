import React, { useState } from "react";

function PlaylistSelectorModal({ isOpen, onClose, onSelectPlaylist, cancionId }) {
    const [playlistId, setPlaylistId] = useState(""); // Estado para almacenar el ID de la playlist ingresado

    const handleConfirm = () => {
        if (!playlistId) {
            alert("Por favor, ingresa un ID de playlist válido.");
            return;
        }
        onSelectPlaylist(playlistId, cancionId); // Llama a la función para agregar la canción a la playlist
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
            </div>
        </div>
    );
}

export default PlaylistSelectorModal;
