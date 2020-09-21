using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Models

{
    public class Game
    {
        public int GameId {get; set;}
        
        [Required]
        public string Title {get; set;}

        [Required]
        public string Platform {get; set;}

        public string Description {get; set;}

        public DateTime LaunchDate {get; set;}

        public List<Loan> Loans {get; set;}

        public string IdentityId { get; set; }
        public User Identity { get; set; }
    }


}