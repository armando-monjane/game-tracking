using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GameTrackingAPI.Data
{
    public class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder applicationBuilder) {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope()) {
                SeedData(serviceScope.ServiceProvider.GetService<GamerContext>());
            }
        }

        public static void SeedData(GamerContext context) {
            
            System.Console.WriteLine("Applying Migrations...");

            context.Database.Migrate();
        }
    }
}