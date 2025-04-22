using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; 

namespace MusicApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReproducirCancionController : ControllerBase
    {
        private readonly ILogger<ReproducirCancionController> _logger; // Declara una variable para el logger

        // Constructor para inyectar el logger
        public ReproducirCancionController(ILogger<ReproducirCancionController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Reproducir/{nombre}")]
        public IActionResult Reproducir(string nombre)
        {
            // Agrega esta línea de log al inicio del método
            _logger.LogInformation($"Received request to Reproducir for song: {nombre}");

            var ruta = Path.Combine("C:\\Users\\Kendall\\Desktop\\musicapp\\MusicApp\\MusicApp\\canciones", $"{nombre}.mp3");

            if (!System.IO.File.Exists(ruta))
            {
                _logger.LogWarning($"Song not found: {ruta}"); // Log si no se encuentra la canción
                return NotFound("Cancion no encontrada");
            }

            try
            {
                var audioBytes = System.IO.File.ReadAllBytes(ruta);
                _logger.LogInformation($"Successfully read song bytes for: {nombre}"); // Log si se lee correctamente
                return File(audioBytes, "audio/mpeg", $"{nombre}.mp3");
            }
            catch (Exception ex) // Captura cualquier excepción durante la lectura
            {
                _logger.LogError(ex, $"Error reading song file: {ruta}"); // Log del error
                                                                          
                return StatusCode(500, "Error al procesar el archivo de audio.");
            }
        }
    }
}