namespace MusicApp.Models
{
    // Ensure the LoginRequest model matches the expected input
    public class LoginRequest
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
