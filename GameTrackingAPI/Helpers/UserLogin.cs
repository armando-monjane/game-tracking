using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Helpers
{
    public class UserLogin
    {
        [Required]
        public string Username {get; set;}

        [Required]
        public string Password {get; set;}
    }
}