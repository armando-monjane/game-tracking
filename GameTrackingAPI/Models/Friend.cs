using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GameTrackingAPI.Models
{
    public class Friend
    {
        public int Id {get; set;}
        
        [Required]
        public string Name {get; set;}

        public List<Loan> Loans {get; set;}

         public string IdentityId { get; set; }
        public User Identity { get; set; }
    }
}