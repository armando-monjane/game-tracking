using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Dtos
{
    public class UserCreateDto
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName {get; set;}

        [Required]
        public string LastName {get; set;}
    }
}