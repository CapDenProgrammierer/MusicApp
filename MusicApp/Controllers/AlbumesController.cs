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
    public class AlbumesController : ControllerBase
    {
        private readonly SpotilinfContext _context;

        public AlbumesController(SpotilinfContext context)
        {
            _context = context;
        }

        // GET: api/Albumes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Albume>>> GetAlbumes()
        {
            return await _context.Albumes.ToListAsync();
        }

        // GET: api/Albumes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Albume>> GetAlbume(int id)
        {
            var albume = await _context.Albumes.FindAsync(id);

            if (albume == null)
            {
                return NotFound();
            }

            return albume;
        }

        // PUT: api/Albumes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbume(int id, Albume albume)
        {
            if (id != albume.AlbumId)
            {
                return BadRequest();
            }

            _context.Entry(albume).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumeExists(id))
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

        // POST: api/Albumes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Albume>> PostAlbume(Albume albume)
        {
            _context.Albumes.Add(albume);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlbume", new { id = albume.AlbumId }, albume);
        }

        // DELETE: api/Albumes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbume(int id)
        {
            var albume = await _context.Albumes.FindAsync(id);
            if (albume == null)
            {
                return NotFound();
            }

            _context.Albumes.Remove(albume);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlbumeExists(int id)
        {
            return _context.Albumes.Any(e => e.AlbumId == id);
        }
    }
}
