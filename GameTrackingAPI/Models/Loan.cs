using System;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Models
{
    public class Loan
    {
        public int Id {get; set;}

        [Required]
        public DateTime DataEmprestimo {get; set;}
        public DateTime DataDevolucao {get; set;}
        
        [Required]
        public string Status {get; set;}
        public int GameId {get; set;}
        public Game Game {get; set;}

        public int FriendId {get; set;}
        public Friend Friend {get; set;}

    }
}