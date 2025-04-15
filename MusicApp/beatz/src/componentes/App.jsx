import React, { useState } from "react";
import "../css/App.css";

import BibliotecaView from "./BibliotecaView";
import BuscarView from "./BuscarView";
import AlbumView from "./AlbumView"; 

import fotoUsuario from "../recursos/fotoUsuario.jpg";
import logo from "../recursos/logo.jpeg";
import inicio from "../recursos/inicio.png";
import buscar from "../recursos/buscar.png";
import biblioteca from "../recursos/biblioteca.png";
import expandirVentana from "../recursos/expandirVentana.png";
import fotoAlbum1 from "../recursos/fotoAlbum1.jpg";
import fotoAlbum2 from "../recursos/fotoAlbum2.jpg";
import fotoAlbum3 from "../recursos/fotoAlbum3.jpg";
import fotoAlbum4 from "../recursos/fotoAlbum4.jpg";
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
import cerrar from "../recursos/cerrar.png";
import minimizar from "../recursos/minimizar.png";
import like from "../recursos/like.png";
import FotoCancion from "../recursos/FotoCancion.jpg";

function App() {
  const [currentView, setCurrentView] = useState('inicio');
  const [selectedAlbum, setSelectedAlbum] = useState(null); // Estado para almacenar el álbum seleccionado

  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
    setCurrentView('album');
  };

  
  return (
    <div className="menuInicio">
      <div className="overlapGroupWrapper">
        <div className="overlapGroup">

          {/* --- Sidebar --- */}
          <div className="overlap">
            <div className="sidebarTop">
              <img className="logo" alt="Logo" src={logo} />
              <img className="fotoUsuario" alt="Foto usuario" src={fotoUsuario} />
              <div className="userName">Kendall Cordero</div>
            </div>
            <nav className="sidebarNav">
              <div className={`navItem ${currentView === 'inicio' ? 'active' : ''}`} onClick={() => setCurrentView('inicio')}> {/* 'home' class renombrada a navItem */}
                <div className="icon icon-home" style={{ WebkitMaskImage: `url(${inicio})`, maskImage: `url(${inicio})` }}></div>
                <div className="textWrapper">Inicio</div>
              </div>
              <div className={`navItem ${currentView === 'buscar' ? 'active' : ''}`} onClick={() => setCurrentView('buscar')}> {/* 'buscar' class renombrada a navItem */}
                <div className="icon icon-buscar" style={{ WebkitMaskImage: `url(${buscar})`, maskImage: `url(${buscar})` }}></div>
                <div className="inicio">Buscar</div>
              </div>
              <div className={`navItem ${currentView === 'biblioteca' ? 'active' : ''}`} onClick={() => setCurrentView('biblioteca')}> {/* 'biblioteca' class renombrada a navItem */}
                <div className="icon icon-biblioteca" style={{ WebkitMaskImage: `url(${biblioteca})`, maskImage: `url(${biblioteca})` }}></div>
                <div className="inicio2">Biblioteca</div>
              </div>
            </nav>
          </div>

          {/* --- Main Content Area --- */}
          <div className="overlap2">
            <div className="windowControls">
              {/* Iconos de ventana */}
              <div className="icon window-icon icon-minimizar" style={{ WebkitMaskImage: `url(${minimizar})`, maskImage: `url(${minimizar})` }}></div>
              <div className="icon window-icon icon-maximizar" style={{ WebkitMaskImage: `url(${expandirVentana})`, maskImage: `url(${expandirVentana})` }}></div>
              <div className="icon window-icon icon-cerrar" style={{ WebkitMaskImage: `url(${cerrar})`, maskImage: `url(${cerrar})` }}></div>
            </div>

            {currentView === 'inicio' ? (
              <>
                <div className="titulo">Inicio</div>
                <div className="paraTi">Para ti</div>
                <div className="albumContainer">
                  <div onClick={() => handleAlbumSelect({ title: 'Un Verano Sin Ti', artist: 'Bad Bunny', artwork: fotoAlbum1 })}>
                    <img className="FotoAlbum1" alt="Album Madvillainy" src={fotoAlbum1} style={{ cursor: 'pointer' }} />
                  </div>
                  <div onClick={() => handleAlbumSelect({ title: 'AM', artist: 'Arctic Monkeys', artwork: fotoAlbum2 })}>
                    <img className="FotoAlbum2" alt="Album Un Verano Sin Ti" src={fotoAlbum2} style={{ cursor: 'pointer' }} />
                  </div>
                  <div onClick={() => handleAlbumSelect({ title: 'Lateralus', artist: 'Tool', artwork: fotoAlbum3 })}>
                    <img className="FotoAlbum3" alt="Album AM" src={fotoAlbum3} style={{ cursor: 'pointer' }} />
                  </div>
                  <div onClick={() => handleAlbumSelect({ title: 'MM.FOOD', artist: 'MFDOOM', artwork: fotoAlbum4 })}>
                    <img className="FotoAlbum4" alt="Album Lateralus" src={fotoAlbum4} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <div className="albumTitlesContainer">
                  <div className="nombreAlbum">Un Verano Sin Ti</div>
                  <div className="nombreAlbum2">AM</div>
                  <div className="nombreAlbum3">Lateralus</div>
                  <div className="nombreAlbum4">MM..FOOD</div>
                </div>
                <div className="sugerencias">Sugerencias para hoy</div>
              </>
            ) : currentView === 'buscar' ? (
              <BuscarView onAlbumSelect={handleAlbumSelect} />
            ) : currentView === 'biblioteca' ? (
              <BibliotecaView onAlbumSelect={handleAlbumSelect} />
            ) : currentView === 'album' ? (
              <AlbumView album={selectedAlbum}/>
            ) : null}
          </div>

          {/* --- Bottom Player Bar --- */}
          <div className="overlap3">
            <div className="playerLeft">
              <img className="currentAlbumArt" src={FotoCancion} alt="Current Album Art" />
              <div className="songDetails">
                <div className="nombreCancion">Fancy Clown</div>
                <div className="nombreArtista">MF DOOM</div>
              </div>
              {/* Icono like */}
              <div className="icon icon-like" style={{ WebkitMaskImage: `url(${like})`, maskImage: `url(${like})` }}></div>
            </div>

            <div className="playerCenter">
              <div className="playerControls">
                {/* Iconos de controles */}
                <div className="icon icon-random" style={{ WebkitMaskImage: `url(${aleatorio})`, maskImage: `url(${aleatorio})` }}></div>
                <div className="icon icon-anterior" style={{ WebkitMaskImage: `url(${anterior})`, maskImage: `url(${anterior})` }}></div>
                <div className="reproducir-wrapper"><img src={playButton} alt="Reproducir" className="reproducir-icon" /></div>
                <div className="icon icon-siguiente" style={{ WebkitMaskImage: `url(${siguiente})`, maskImage: `url(${siguiente})` }}></div>
                <div className="icon icon-repetir" style={{ WebkitMaskImage: `url(${repetir})`, maskImage: `url(${repetir})` }}></div>
              </div>
              <div className="progressBarContainer">
                <div className="currentTime">0:45</div>
                <div className="progressBar">
                  <div style={{ width: '30%' }}></div>
                </div>
                <div className="totalTime">3:55</div>
              </div>
            </div>

            <div className="playerRight">
              {/* Iconos derechos */}
              <div className="icon icon-letra" style={{ WebkitMaskImage: `url(${microfono})`, maskImage: `url(${microfono})` }}></div>
              <div className="icon icon-cola" style={{ WebkitMaskImage: `url(${cola})`, maskImage: `url(${cola})` }}></div>
              <div className="icon icon-dispositivo" style={{ WebkitMaskImage: `url(${conectarDispositivo})`, maskImage: `url(${conectarDispositivo})` }}></div>
              <div className="icon icon-volumen" style={{ WebkitMaskImage: `url(${volumen})`, maskImage: `url(${volumen})` }}></div>
              <div className="barraVolumen">
                <div style={{ width: '70%' }}></div>
              </div>
              <div className="icon icon-expandir" style={{ WebkitMaskImage: `url(${expandir})`, maskImage: `url(${expandir})` }}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;