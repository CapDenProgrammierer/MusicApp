using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Artista
{
    public int ArtistaId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string? Alias { get; set; }

    public string? Nacionalidad { get; set; }

    public string? Genero { get; set; }

    public DateOnly? FechaNacimiento { get; set; }

    public DateOnly? FechaDefuncion { get; set; }

    public string? Obras { get; set; }

    public virtual ICollection<Albume> Albumes { get; set; } = new List<Albume>();

    public virtual ICollection<Cancione> Canciones { get; set; } = new List<Cancione>();
}
