using System;

namespace GameTrackingAPI.Dtos
{
    public class LoanReadDto
    {
        public int Id {get; set;}

        public DateTime DataEmprestimo {get; set;}
        public DateTime DataDevolucao {get; set;}
        
        public string Status {get; set;}

        public GameReadDto Game {get; set;}
        public FriendReadDto Friend {get; set;}
    }
}