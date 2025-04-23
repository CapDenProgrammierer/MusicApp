import React, { useState, useEffect } from "react"; // Mantén esta línea
import buscar from "../recursos/buscar.png";
import "../css/BibliotecaView.css";
import axios from "axios";
import PlaylistSongsModal from "./PlaylistSongsModal"; // Importa el nuevo modal


import fotoAlbum5 from "../recursos/fotoAlbum5.jpg";
import fotoAlbum6 from "../recursos/fotoAlbum6.jpg";
import fotoAlbum7 from "../recursos/fotoAlbum7.jpg";
import fotoAlbum8 from "../recursos/fotoAlbum8.jpg";

function BibliotecaView({ onAlbumSelect }) { // Recibe la función onAlbumSelect como prop
    const handleAlbumClick = (album) => {
        onAlbumSelect(album); // Llama a la función onAlbumSelect con la información del álbum
    };

    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [canciones, setCanciones] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get("http://localhost:5279/api/Playlists");
                setPlaylists(response.data);
            } catch (error) {
                console.error("Error al obtener las playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    const handlePlaylistSelect = async (playlistId) => {
        try {
            const response = await axios.get(`http://localhost:5279/api/Playlists/${playlistId}/canciones`);
            setCanciones(response.data);
            setSelectedPlaylist(playlistId);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error al obtener las canciones de la playlist:", error);
        }
    };

    return (
        <div className="biblioteca-view-container">
            <div className="biblioteca-titulo">Biblioteca</div>
            <div className="biblioteca-botones-container">
                <button className="biblioteca-boton">Playlists</button>
                <button className="biblioteca-boton">Artistas</button>
                <button className="biblioteca-boton">Álbumes</button>
            </div>
            <div className="biblioteca-buscador-container">
                <div className="icon icon-buscar" style={{ WebkitMaskImage: `url(${buscar})`, maskImage: `url(${buscar})`, width: '20px', height: '20px', marginRight: '10px' }}></div>
                <input type="text" placeholder="Buscar" className="biblioteca-buscador-input" />
            </div>
            <div className="albumContainer">
                <div onClick={() => handleAlbumClick({ title: 'El comienzo', artist: 'Grupo Frontera', artwork: fotoAlbum6 })}>
                    <img className="FotoAlbum1" alt="Album El comienzo" src={fotoAlbum6} style={{ cursor: 'pointer' }} />
                </div>
                <div onClick={() => handleAlbumClick({ title: 'La medicina', artist: 'Los Tetas', artwork: fotoAlbum5 })}>
                    <img className="FotoAlbum2" alt="Album La medicina" src={fotoAlbum5} style={{ cursor: 'pointer' }} />
                </div>
                <div onClick={() => handleAlbumClick({ title: 'Demon Days', artist: 'Gorillaz', artwork: fotoAlbum7 })}>
                    <img className="FotoAlbum3" alt="Album Demon Days" src={fotoAlbum7} style={{ cursor: 'pointer' }} />
                </div>
                <div onClick={() => handleAlbumClick({ title: 'Rumours', artist: 'Fleetwood Mac', artwork: fotoAlbum8 })}>
                    <img className="FotoAlbum4" alt="Album Rumours" src={fotoAlbum8} style={{ cursor: 'pointer' }} />
                </div>
            </div>
            <div className="albumTitlesContainer">
                <div className="nombreAlbum">El comienzo</div>
                <div className="nombreAlbum2">La medicina</div>
                <div className="nombreAlbum3">Demon Days</div>
                <div className="nombreAlbum4">Rumours</div>
            </div>
            <div>
                <h1>Seleccionar Playlist</h1>
                <ul>
                    {playlists.map((playlist) => (
                        <li key={playlist.playlistId}>
                            <button onClick={() => handlePlaylistSelect(playlist.playlistId)}>
                                {playlist.nombre}
                            </button>
                        </li>
                    ))}
                </ul>
                <PlaylistSongsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    canciones={canciones}
                />
            </div>
        </div>
    );
}

export default BibliotecaView;
