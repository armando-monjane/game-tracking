using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Dtos
{
    public class GameReadDto
    {

        public int GameId {get; set;}
        
        public string Title {get; set;}

        public string Platform {get; set;}

        public string Description {get; set;}

        public DateTime LaunchDate {get; set;}

        public List<LoanReadDto> Loans {get; set;}
        
    }
}