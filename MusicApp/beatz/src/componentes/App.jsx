import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../css/App.css";
import axios from "axios";

import BibliotecaView from "./BibliotecaView";
import BuscarView from "./BuscarView";
import AlbumView from "./AlbumView";
import PlaylistSelectorModal from "./PlaylistSelectorModal";

import fotoUsuario from "../recursos/fotoUsuario.jpg";
import logo from "../recursos/logo.jpeg";
import inicio from "../recursos/inicio.png";
import buscar from "../recursos/buscar.png";
import biblioteca from "../recursos/biblioteca.png";

function App() {
  const [currentView, setCurrentView] = useState('inicio');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [audio, setAudio] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  

  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
    setCurrentView('album');
  };
    const [currentView, setCurrentView] = useState("inicio");
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeUser, setActiveUser] = useState(null);
    const [canciones, setCanciones] = useState([]); // Estado para almacenar las canciones con sus artistas
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [selectedCancionId, setSelectedCancionId] = useState(null); // Canción seleccionada para agregar

    // Forzar inicio de sesión con el usuario de ID 2
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5279/api/Usuarios/2");
                setActiveUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error al iniciar sesión automáticamente:", error);
                alert("Error al iniciar sesión automáticamente. Verifica la consola para más detalles.");
            }
        };

        fetchUser();
    }, []);

    // Obtener la lista de canciones y sus artistas al cargar la página
    useEffect(() => {
        const fetchCancionesConArtistas = async () => {
            try {
                const response = await axios.get("http://localhost:5279/api/Canciones");
                const cancionesConArtistas = await Promise.all(
                    response.data.map(async (cancion) => {
                        try {
                            const artistaResponse = await axios.get(`http://localhost:5279/api/Artistas/${cancion.artistaId}`);
                            return { ...cancion, artistaNombre: artistaResponse.data.nombre };
                        } catch (error) {
                            console.error(`Error al obtener el artista para la canción con ID ${cancion.cancionId}:`, error);
                            return { ...cancion, artistaNombre: "Artista desconocido" };
                        }
                    })
                );
                setCanciones(cancionesConArtistas);
            } catch (error) {
                console.error("Error al obtener las canciones:", error);
                alert("Error al obtener las canciones. Verifica la consola para más detalles.");
            }
        };

        fetchCancionesConArtistas();
    }, []);

    // Manejar la apertura del modal
    const handleOpenModal = (cancionId) => {
        setSelectedCancionId(cancionId);
        setIsModalOpen(true);
    };

    // Manejar la selección de una playlist
    const handleSelectPlaylist = async (playlistId, cancionId) => {
        try {
            await axios.post(`http://localhost:5279/api/Playlists/${playlistId}/canciones`, cancionId, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("Canción agregada a la playlist con éxito.");
            setIsModalOpen(false); // Cerrar el modal
        } catch (error) {
            console.error("Error al agregar la canción a la playlist:", error);
            alert("Error al agregar la canción a la playlist. Verifica la consola para más detalles.");
        }
    };

    return (
        <Router>
            <Routes>
                {/* Ruta protegida: App principal */}
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <div className="menuInicio">
                                <div className="overlapGroupWrapper">
                                    <div className="overlapGroup">
                                        {/* --- Sidebar --- */}
                                        <div className="overlap">
                                            <div className="sidebarTop">
                                                <img className="logo" alt="Logo" src={logo} />
                                                <img className="fotoUsuario" alt="Foto usuario" src={fotoUsuario} />
                                                <div className="userName">
                                                    {activeUser ? activeUser.nombre : "Cargando..."}
                                                </div>
                                            </div>
                                            <nav className="sidebarNav">
                                                <div
                                                    className={`navItem ${currentView === "inicio" ? "active" : ""}`}
                                                    onClick={() => setCurrentView("inicio")}
                                                >
                                                    <div
                                                        className="icon icon-home"
                                                        style={{
                                                            WebkitMaskImage: `url(${inicio})`,
                                                            maskImage: `url(${inicio})`,
                                                        }}
                                                    ></div>
                                                    <div className="textWrapper">Inicio</div>
                                                </div>
                                                <div
                                                    className={`navItem ${currentView === "buscar" ? "active" : ""}`}
                                                    onClick={() => setCurrentView("buscar")}
                                                >
                                                    <div
                                                        className="icon icon-buscar"
                                                        style={{
                                                            WebkitMaskImage: `url(${buscar})`,
                                                            maskImage: `url(${buscar})`,
                                                        }}
                                                    ></div>
                                                    <div className="inicio">Buscar</div>
                                                </div>
                                                <div
                                                    className={`navItem ${currentView === "biblioteca" ? "active" : ""}`}
                                                    onClick={() => setCurrentView("biblioteca")}
                                                >
                                                    <div
                                                        className="icon icon-biblioteca"
                                                        style={{
                                                            WebkitMaskImage: `url(${biblioteca})`,
                                                            maskImage: `url(${biblioteca})`,
                                                        }}
                                                    ></div>
                                                    <div className="inicio2">Biblioteca</div>
                                                </div>
                                            </nav>
                                        </div>

                                        {/* --- Main Content Area --- */}
                                        <div className="overlap2">
                                            {currentView === "inicio" ? (
                                                <>
                                                    <div className="titulo">Inicio</div>
                                                    <div className="paraTi">Para ti</div>
                                                    <div className="cancionesContainer">
                                                        {canciones.map((cancion) => (
                                                            <div key={cancion.cancionId} className="cancionItem">
                                                                <div className="cancionNombre">{cancion.nombre}</div>
                                                                <div className="cancionArtista">{cancion.artistaNombre}</div>
                                                                <div className="cancionDuracion">{cancion.duracion ? `${cancion.duracion} min` : "Duración desconocida"}</div>
                                                                <button
                                                                    onClick={() => handleOpenModal(cancion.cancionId)}
                                                                    className="addToPlaylistButton"
                                                                >
                                                                    Agregar a Playlist
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : currentView === "buscar" ? (
                                                <BuscarView onAlbumSelect={handleAlbumSelect} />
                                            ) : currentView === "biblioteca" ? (
                                                <BibliotecaView onAlbumSelect={handleAlbumSelect} />
                                            ) : currentView === "album" ? (
                                                <AlbumView album={selectedAlbum} />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
            <PlaylistSelectorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectPlaylist={handleSelectPlaylist}
                cancionId={selectedCancionId}
            />
        </Router>
    );
}

export default App;
 