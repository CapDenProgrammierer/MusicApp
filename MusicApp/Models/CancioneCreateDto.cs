namespace MusicApp.Models
{
    public class CancioneCreateDto
    {
        public string Nombre { get; set; } = null!;
        public int ArtistaId { get; set; }
        public string? Genero { get; set; }
        public int? Anho { get; set; }
        public int? Duracion { get; set; }
        public byte[]? Cancion { get; set; }
    }
}
