using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GameTrackingAPI.Data
{
    public class GamerContext : IdentityDbContext<User>
    {
        public GamerContext(DbContextOptions<GamerContext> options) : base(options)
        {
            
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Loan> Loans { get; set; }
        
    }
}