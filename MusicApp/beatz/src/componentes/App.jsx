import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../css/App.css";
import axios from "axios";

import BibliotecaView from "./BibliotecaView";
import BuscarView from "./BuscarView";
import AlbumView from "./AlbumView";
import PlaylistSelectorModal from "./PlaylistSelectorModal";
import Login from "./Login";

import fotoUsuario from "../recursos/fotoUsuario.jpg";
import logo from "../recursos/logo.jpeg";
import inicio from "../recursos/inicio.png";
import buscar from "../recursos/buscar.png";
import biblioteca from "../recursos/biblioteca.png";
import playButton from "../recursos/PlayButton.png";
import repetir from "../recursos/repetir.png";
import siguiente from "../recursos/Siguiente.png";
import anterior from "../recursos/anterior.png";
import aleatorio from "../recursos/Aleatorio.png";
import volumen from "../recursos/volumen.png";
import microfono from "../recursos/microfono.png";
import cola from "../recursos/cola.png";
import conectarDispositivo from "../recursos/ConectarDispositivo.png";
import expandir from "../recursos/expandir.png";
import like from "../recursos/like.png";
import FotoCancion from "../recursos/FotoCancion.jpg";

function App() {
    const [currentView, setCurrentView] = useState("inicio");
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeUser, setActiveUser] = useState(null);
    const [canciones, setCanciones] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCancionId, setSelectedCancionId] = useState(null);
    const [currentSong, setCurrentSong] = useState(null); // Estado para la canción seleccionada
    const [isPlaying, setIsPlaying] = useState(false); // Estado de reproducción
    const [audio, setAudio] = useState(null); // Objeto de audio

    const handleLogin = (user) => {
        setActiveUser(user);
        setIsAuthenticated(true);
    };

    const handleAlbumSelect = (album) => {
        setSelectedAlbum(album);
        setCurrentView("album");
    };

    const handleOpenModal = (cancionId) => {
        setSelectedCancionId(cancionId);
        setIsModalOpen(true);
    };

    const handleSelectPlaylist = async (playlistId, cancionId) => {
        try {
            await axios.post(`http://localhost:5279/api/Playlists/${playlistId}/canciones`, cancionId, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("Canción agregada a la playlist con éxito.");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error al agregar la canción a la playlist:", error);
            alert("Error al agregar la canción a la playlist. Verifica la consola para más detalles.");
        }
    };

    const handleSongSelect = (cancion) => {
        setCurrentSong(cancion); // Actualizar la canción seleccionada
    };

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

    const reproducirCancion = async () => {
        try {
            if (audio && isPlaying) {
                // Si la canción ya está en reproducción, pausamos
                audio.pause();
                setIsPlaying(false);
            } else {
                // Si no hay canción o está pausada, la reproducimos
                const response = await fetch("http://localhost:5279/api/ReproducirCancion/Reproducir"); // Cambiar a HTTP
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);

                if (audio) {
                    audio.pause();
                    URL.revokeObjectURL(audio.src); // Limpia el anterior
                }

                const nuevoAudio = new Audio(url);
                nuevoAudio.play();
                setAudio(nuevoAudio);
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Error al reproducir:", error);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <div className="menuInicio">
                                <div className="overlapGroupWrapper">
                                    <div className="overlapGroup">
                                        {/* Sidebar */}
                                        <div className="overlap">
                                            <div className="sidebarTop">
                                                <img className="logo" alt="Logo" src={logo} />
                                                <img className="fotoUsuario" alt="Foto usuario" src={fotoUsuario} />
                                                <div className="userName">{activeUser ? activeUser.nombre : "Cargando..."}</div>
                                            </div>
                                            <nav className="sidebarNav">
                                                <div className={`navItem ${currentView === "inicio" ? "active" : ""}`} onClick={() => setCurrentView("inicio")}>
                                                    <div className="icon icon-home" style={{ WebkitMaskImage: `url(${inicio})`, maskImage: `url(${inicio})` }}></div>
                                                    <div className="textWrapper">Inicio</div>
                                                </div>
                                                <div className={`navItem ${currentView === "buscar" ? "active" : ""}`} onClick={() => setCurrentView("buscar")}>
                                                    <div className="icon icon-buscar" style={{ WebkitMaskImage: `url(${buscar})`, maskImage: `url(${buscar})` }}></div>
                                                    <div className="inicio">Buscar</div>
                                                </div>
                                                <div className={`navItem ${currentView === "biblioteca" ? "active" : ""}`} onClick={() => setCurrentView("biblioteca")}>
                                                    <div className="icon icon-biblioteca" style={{ WebkitMaskImage: `url(${biblioteca})`, maskImage: `url(${biblioteca})` }}></div>
                                                    <div className="inicio2">Biblioteca</div>
                                                </div>
                                            </nav>
                                        </div>

                                        {/* Main Content */}
                                        <div className="overlap2">
                                            {currentView === "inicio" && (
                                                <>
                                                    <div className="titulo">Inicio</div>
                                                    <div className="paraTi">Para ti</div>
                                                    <div className="cancionesContainer">
                                                        {canciones.map((cancion) => (
                                                            <div
                                                                key={cancion.cancionId}
                                                                className="cancionItem"
                                                                onClick={() => handleSongSelect(cancion)} // Seleccionar canción
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <div className="cancionNombre">{cancion.nombre}</div>
                                                                <div className="cancionArtista">{cancion.artistaNombre}</div>
                                                                <div className="cancionDuracion">{cancion.duracion ? `${cancion.duracion} min` : "Duración desconocida"}</div>
                                                                <button onClick={(e) => { e.stopPropagation(); handleOpenModal(cancion.cancionId); }} className="addToPlaylistButton">
                                                                    Agregar a Playlist
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                            {currentView === "buscar" && <BuscarView onAlbumSelect={handleAlbumSelect} />}
                                            {currentView === "biblioteca" && <BibliotecaView onAlbumSelect={handleAlbumSelect} />}
                                            {currentView === "album" && <AlbumView album={selectedAlbum} />}
                                        </div>

                                        {/* Player */}
                                        <div className="overlap3">
                                            <div className="playerLeft">
                                                <img className="currentAlbumArt" src={FotoCancion} alt="Current Album Art" />
                                                <div className="songDetails">
                                                    <div className="nombreCancion">{currentSong ? currentSong.nombre : "Selecciona una canción"}</div>
                                                    <div className="nombreArtista">{currentSong ? currentSong.artistaNombre : "Artista desconocido"}</div>
                                                </div>
                                                <div className="icon icon-like" style={{ WebkitMaskImage: `url(${like})`, maskImage: `url(${like})` }}></div>
                                            </div>

                                            <div className="playerCenter">
                                                <div className="playerControls">
                                                    <div className="icon icon-random" style={{ WebkitMaskImage: `url(${aleatorio})`, maskImage: `url(${aleatorio})` }}></div>
                                                    <div className="icon icon-anterior" style={{ WebkitMaskImage: `url(${anterior})`, maskImage: `url(${anterior})` }}></div>
                                                    <button className="reproducir-wrapper" onClick={reproducirCancion}>
                                                        <img src={playButton} alt="Reproducir" className="reproducir-icon" />
                                                    </button>
                                                    <div className="icon icon-siguiente" style={{ WebkitMaskImage: `url(${siguiente})`, maskImage: `url(${siguiente})` }}></div>
                                                    <div className="icon icon-repetir" style={{ WebkitMaskImage: `url(${repetir})`, maskImage: `url(${repetir})` }}></div>
                                                </div>
                                                <div className="progressBarContainer">
                                                    <div className="currentTime">0:45</div>
                                                    <div className="progressBar">
                                                        <div style={{ width: "30%" }}></div>
                                                    </div>
                                                    <div className="totalTime">3:55</div>
                                                </div>
                                            </div>

                                            <div className="playerRight">
                                                <div className="icon icon-letra" style={{ WebkitMaskImage: `url(${microfono})`, maskImage: `url(${microfono})` }}></div>
                                                <div className="icon icon-cola" style={{ WebkitMaskImage: `url(${cola})`, maskImage: `url(${cola})` }}></div>
                                                <div className="icon icon-dispositivo" style={{ WebkitMaskImage: `url(${conectarDispositivo})`, maskImage: `url(${conectarDispositivo})` }}></div>
                                                <div className="icon icon-volumen" style={{ WebkitMaskImage: `url(${volumen})`, maskImage: `url(${volumen})` }}></div>
                                                <div className="barraVolumen">
                                                    <div style={{ width: "70%" }}></div>
                                                </div>
                                                <div className="icon icon-expandir" style={{ WebkitMaskImage: `url(${expandir})`, maskImage: `url(${expandir})` }}></div>
                                            </div>
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
            <PlaylistSelectorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectPlaylist={handleSelectPlaylist} cancionId={selectedCancionId} />
        </Router>
    );
}

export default App;
