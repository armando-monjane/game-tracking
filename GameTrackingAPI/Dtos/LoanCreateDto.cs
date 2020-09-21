using System;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Dtos
{
    public class LoanCreateDto
    {

        [Required]
        public int GameId {get; set;}

        [Required]
        public int FriendId {get; set;}
        
    }
}