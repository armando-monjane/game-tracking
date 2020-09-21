using System;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Dtos
{
    public class GameUpdateDto
    {
        [Required]
        public string Title {get; set;}

        [Required]
        public string Platform {get; set;}

        public string Description {get; set;}

        public DateTime LaunchDate {get; set;}
    }
}