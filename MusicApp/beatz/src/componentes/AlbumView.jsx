import React from "react";
import "../css/AlbumView.css";

import likeIcon from "../recursos/like.png";
import playIcon from "../recursos/PlayButton.png";

function AlbumView({ album, onArtistSelect }) { // Recibe onArtistSelect como prop
  if (!album) {
    return <div>No album selected.</div>;
  }

  const handleArtistClick = (artistName) => {
    onArtistSelect(artistName);
  };

  const canciones = [
    { title: "Nombre de la Canción 1" },
    { title: "Otra Canción Genial" },
    { title: "Una Canción Más" },
    // ... más canciones
  ];

  return (
    <div className="album-view-container">
      <div className="album-header">
        <img src={album.artwork} alt={album.title} className="album-artwork-large" />
        <div className="album-details">
          <h2 className="album-title">{album.title}</h2>
          <h3 className="album-artist" onClick={() => handleArtistClick(album.artist)} style={{ cursor: 'pointer' }}>{album.artist}</h3>
          <div className="album-controls">
            <button className="album-play-button">
              <img src={playIcon} alt="Reproducir" className="album-play-icon" />
              Reproducir
            </button>
            <img src={likeIcon} alt="Like" className="album-like-icon" />
          </div>
        </div>
      </div>
      <div className="album-tracklist">
        <ul>
          {canciones.map((cancion, index) => (
            <li key={index} className="song-item">
              <img src={album.artwork} alt={album.title} className="song-artwork" />
              <span>{cancion.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AlbumView;