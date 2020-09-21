using System;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Dtos
{
    public class LoanUpdateDto
    {
        [Required]
        public int Id {get; set;}

        public DateTime DataEmprestimo {get; set;}
        public DateTime DataDevolucao {get; set;}
        
        [Required]
        public string Status {get; set;}
        public int GameId {get; set;}

        public int FriendId {get; set;}
    }
}