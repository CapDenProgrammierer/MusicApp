using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Albume
{
    public int AlbumId { get; set; }

    public string Nombre { get; set; } = null!;

    public int ArtistaId { get; set; }

    public string? Genero { get; set; }

    public int? Anho { get; set; }

    public int? Duracion { get; set; }


    public virtual Artista Artista { get; set; } = null!;
    public virtual ICollection<Cancione> Canciones { get; set; } = new List<Cancione>();
}
