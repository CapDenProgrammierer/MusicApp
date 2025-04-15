using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MusicApp.Models;

public partial class SpotilinfContext : DbContext
{
    public SpotilinfContext()
    {
    }

    public SpotilinfContext(DbContextOptions<SpotilinfContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Albume> Albumes { get; set; }

    public virtual DbSet<Artista> Artistas { get; set; }

    public virtual DbSet<Cancione> Canciones { get; set; }

    public virtual DbSet<Playlist> Playlists { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=PCVONSANTIAGO;Initial Catalog=Spotilinf;Integrated Security=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Albume>(entity =>
        {
            entity.HasKey(e => e.AlbumId).HasName("PK__Albumes__97B4BE17FE8E898E");

            entity.Property(e => e.AlbumId).HasColumnName("AlbumID");
            entity.Property(e => e.ArtistaId).HasColumnName("ArtistaID");
            entity.Property(e => e.Genero).HasMaxLength(50);
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.Artista).WithMany(p => p.Albumes)
                .HasForeignKey(d => d.ArtistaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Albumes_Artistas");
        });

        modelBuilder.Entity<Artista>(entity =>
        {
            entity.HasKey(e => e.ArtistaId).HasName("PK__Artistas__1DC48275DECA7431");

            entity.Property(e => e.ArtistaId).HasColumnName("ArtistaID");
            entity.Property(e => e.Alias).HasMaxLength(100);
            entity.Property(e => e.Apellido).HasMaxLength(100);
            entity.Property(e => e.Genero).HasMaxLength(50);
            entity.Property(e => e.Nacionalidad).HasMaxLength(50);
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Cancione>(entity =>
        {
            entity.HasKey(e => e.CancionId).HasName("PK__Cancione__EDA6B1AF42168C04");

            entity.Property(e => e.CancionId).HasColumnName("CancionID");
            entity.Property(e => e.ArtistaId).HasColumnName("ArtistaID");
            entity.Property(e => e.Genero).HasMaxLength(50);
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.Artista).WithMany(p => p.Canciones)
                .HasForeignKey(d => d.ArtistaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Canciones_Artistas");
        });

        modelBuilder.Entity<Playlist>(entity =>
        {
            entity.HasKey(e => e.PlaylistId).HasName("PK__Playlist__B301678030D406DE");

            entity.ToTable("Playlist");

            entity.Property(e => e.PlaylistId).HasColumnName("PlaylistID");
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__Usuarios__2B3DE798F2DB7ABD");

            entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.UserName).HasMaxLength(50);
        });

        // Configuración de la relación muchos a muchos entre Albumes y Canciones
        modelBuilder.Entity<Albume>()
            .HasMany(a => a.Canciones)
            .WithMany(c => c.Albumes)
            .UsingEntity<Dictionary<string, object>>(
                "AlbumCanciones",
                j => j.HasOne<Cancione>().WithMany().HasForeignKey("CancionId"),
                j => j.HasOne<Albume>().WithMany().HasForeignKey("AlbumId"));

        // Configuración de la relación muchos a muchos entre Playlist y Canciones
        modelBuilder.Entity<Playlist>()
            .HasMany(p => p.Canciones)
            .WithMany(c => c.Playlists)
            .UsingEntity<Dictionary<string, object>>(
                "PlaylistCanciones",
                j => j.HasOne<Cancione>().WithMany().HasForeignKey("CancionId"),
                j => j.HasOne<Playlist>().WithMany().HasForeignKey("PlaylistId"));

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
