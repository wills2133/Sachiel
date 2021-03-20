using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z].{4,8}$)", ErrorMessage = "Password must be complex(1 lower case, 1 upper case, 4-8 characters)")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}