using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Playlist
{
    public int PlaylistId { get; set; }

    public string Nombre { get; set; } = null!;

    public int? Duracion { get; set; }

    public virtual ICollection<Cancione> Canciones { get; set; } = new List<Cancione>();
}
