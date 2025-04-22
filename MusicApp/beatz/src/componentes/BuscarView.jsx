import React from "react";
import buscar from "../recursos/buscar.png";
import albumReciente1 from "../recursos/albumReciente1.jpg"; 
import albumReciente2 from "../recursos/albumReciente2.jpg"; 
import albumReciente3 from "../recursos/albumReciente3.jpg"; 
import albumNovedad1 from "../recursos/albumNovedad1.jpg"; 
import albumNovedad2 from "../recursos/albumNovedad2.jpg"; 
import albumNovedad3 from "../recursos/albumNovedad3.jpg"; 
import "../css/BuscarView.css";

function BuscarView({ onAlbumSelect, onArtistSelect }) { // Recibe la función onAlbumSelect y onArtistSelect como props
  const handleAlbumClick = (album) => {
    onAlbumSelect(album); // Llama a la función onAlbumSelect con la información del álbum
  };

  const handleArtistClick = (artistName) => {
    onArtistSelect(artistName);
  };

  return (
    <div className="buscar-view-container">
      <div className="buscar-titulo">Explora algo nuevo</div>
      <div className="buscar-buscador-container">
        <div className="icon icon-buscar" style={{ WebkitMaskImage: `url(${buscar})`, maskImage: `url(${buscar})`, width: '20px', height: '20px', marginRight: '10px' }}></div>
        <input type="text" placeholder="Buscar..." className="buscar-buscador-input" />
      </div>
      <div className="buscar-seccion">
        <div className="buscar-seccion-titulo">Recientes</div>
        <div className="buscar-albumes-recientes">
          <div className="album-card">
            <img src={albumReciente1} alt="Album Reciente 1" className="buscar-album-item" onClick={() => handleAlbumClick({ title: 'Sonido Místico', artist: 'Los Choclock', artwork: albumReciente1 })} style={{ cursor: 'pointer' }} />
            <div className="album-info">
              <div className="album-title">Sonido Místico</div>
              <div className="artist-name" onClick={() => handleArtistClick('Los Choclock')} style={{ cursor: 'pointer' }}>Los Choclock</div>
            </div>
          </div>
          <div className="album-card">
            <img src={albumReciente2} alt="Album Reciente 2" className="buscar-album-item" onClick={() => handleAlbumClick({ title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', artwork: albumReciente2 })} style={{ cursor: 'pointer' }} />
            <div className="album-info">
              <div className="album-title">good kid, m.A.A.d city</div>
              <div className="artist-name" onClick={() => handleArtistClick('Kendrick Lamar')} style={{ cursor: 'pointer' }}>Kendrick Lamar</div>
            </div>
          </div>
          <div className="album-card">
            <img src={albumReciente3} alt="Album Reciente 3" className="buscar-album-item" onClick={() => handleAlbumClick({ title: '"Awaken, My Love!"', artist: 'Childish Gambino', artwork: albumReciente3 })} style={{ cursor: 'pointer' }} />
            <div className="album-info">
              <div className="album-title">"Awaken, My Love!"</div>
              <div className="artist-name" onClick={() => handleArtistClick('Childish Gambino')} style={{ cursor: 'pointer' }}>Childish Gambino</div>
            </div>
          </div>
        </div>
      </div>
      <div className="buscar-seccion">
        <div className="buscar-seccion-titulo">Novedades</div>
        <div className="buscar-albumes-novedades">
          <div className="album-card">
            <img src={albumNovedad1} alt="Album Novedad 1" className="buscar-album-item" onClick={() => handleAlbumClick({ title: 'The Forever Story', artist: 'JID', artwork: albumNovedad1 })} style={{ cursor: 'pointer' }} />
            <div className="album-info">
              <div className="album-title">The Forever Story</div>
              <div className="artist-name" onClick={() => handleArtistClick('JID')} style={{ cursor: 'pointer' }}>JID</div>
            </div>
          </div>
          <div className="album-card">
            <img src={albumNovedad2} alt="Album Novedad 2" className="buscar-album-item" onClick={() => handleAlbumClick({ title: 'Facelift', artist: 'Alice In Chains', artwork: albumNovedad2 })} style={{ cursor: 'pointer' }} />
            <div className="album-info">
              <div className="album-title">Facelift</div>
              <div className="artist-name" onClick={() => handleArtistClick('Alice In Chains')} style={{ cursor: 'pointer' }}>Alice In Chains</div>
            </div>
          </div>
          <div className="album-card">
            <img src={albumNovedad3} alt="Album Novedad 3" className="buscar-album-item" onClick={() => handleAlbumClick({ title: 'Comfort Y Musica Para Volar', artist: 'Soda Stereo', artwork: albumNovedad3 })} style={{ cursor: 'pointer' }} />
            <div className="album-info">
              <div className="album-title">Comfort Y Musica Para Volar</div>
              <div className="artist-name" onClick={() => handleArtistClick('Soda Stereo')} style={{ cursor: 'pointer' }}>Soda Stereo</div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => onAlbumSelect({ title: "Album Demo", artist: "Artista Demo" })}>
        Seleccionar álbum
      </div>
    </div>
  );
}

export default BuscarView;