using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Cancione
{
    public int CancionId { get; set; }

    public string Nombre { get; set; } = null!;

    public int ArtistaId { get; set; }

    public string? Genero { get; set; }

    public int? Anho { get; set; }

    public int? Duracion { get; set; }

    public byte[]? Cancion { get; set; }

    public virtual Artista Artista { get; set; } = null!;

    public virtual ICollection<Albume> Albumes { get; set; } = new List<Albume>();

    public virtual ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
}
