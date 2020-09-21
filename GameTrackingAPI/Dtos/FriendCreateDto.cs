using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Dtos
{
    public class FriendCreateDto
    {

        [Required]
        public string Name {get; set;}
        
    }
}