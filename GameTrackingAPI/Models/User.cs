using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace GameTrackingAPI.Models
{
    public class User: IdentityUser
    {

        public string FirstName {get; set;}

        public string LastName {get; set;}
        public IEnumerable<Friend> Friends {get; set;}

        public IEnumerable<Game> Games {get; set;}
        
    }
}