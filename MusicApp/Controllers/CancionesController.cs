using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Models;

namespace MusicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CancionesController : ControllerBase
    {
        private readonly SpotilinfContext _context;

        public CancionesController(SpotilinfContext context)
        {
            _context = context;
        }

        // GET: api/Canciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetCanciones()
        {
            return await _context.Canciones
                .Select(c => new
                {
                    c.CancionId,
                    c.Nombre,
                    c.ArtistaId,
                    c.Genero,
                    c.Anho,
                    c.Duracion
                })
                .ToListAsync();
        }
        // GET: api/Canciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cancione>> GetCancione(int id)
        {
            var cancione = await _context.Canciones.FindAsync(id);

            if (cancione == null)
            {
                return NotFound();
            }

            return cancione;
        }

        // PUT: api/Canciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCancione(int id, Cancione cancione)
        {
            if (id != cancione.CancionId)
            {
                return BadRequest();
            }

            _context.Entry(cancione).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CancioneExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Canciones
        [HttpPost]
        public async Task<ActionResult<Cancione>> PostCancione([FromBody] CancioneCreateDto nuevaCancion)
        {
            // Crear una nueva instancia de Cancione con los datos proporcionados
            var cancione = new Cancione
            {
                Nombre = nuevaCancion.Nombre,
                ArtistaId = nuevaCancion.ArtistaId,
                Genero = nuevaCancion.Genero,
                Anho = nuevaCancion.Anho,
                Duracion = nuevaCancion.Duracion,
                Cancion = nuevaCancion.Cancion ?? new byte[0], // Inicializar con un arreglo vacío si no se proporciona
                Playlists = new List<Playlist>() // Inicializar como una lista vacía
            };

            // Agregar la nueva canción al contexto
            _context.Canciones.Add(cancione);
            await _context.SaveChangesAsync();

            // Retornar la canción creada
            return CreatedAtAction("GetCancione", new { id = cancione.CancionId }, cancione);
        }


        // DELETE: api/Canciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCancione(int id)
        {
            var cancione = await _context.Canciones.FindAsync(id);
            if (cancione == null)
            {
                return NotFound();
            }

            _context.Canciones.Remove(cancione);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CancioneExists(int id)
        {
            return _context.Canciones.Any(e => e.CancionId == id);
        }
    }
}
