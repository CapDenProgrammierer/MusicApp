import React from "react";
import "../css/PlaylistSongsModal.css"; // Asegúrate de crear un archivo CSS para estilos personalizados

function PlaylistSongsModal({ isOpen, onClose, canciones }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Canciones en la Playlist</h2>
                <ul>
                    {canciones.map((cancion) => (
                        <li key={cancion.cancionId}>
                            <strong>{cancion.nombre}</strong> - {cancion.genero} ({cancion.duracion ? `${cancion.duracion} min` : "Duración desconocida"})
                        </li>
                    ))}
                </ul>
                <button className="close-button" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default PlaylistSongsModal;