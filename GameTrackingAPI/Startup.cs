using System;
using AutoMapper;
using GameTrackingAPI.Data;
using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Text;
using Microsoft.Net.Http.Headers;

namespace GameTrackingAPI
{
    public class Startup
    {
        readonly string AllowSpecificOrigins = "AllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Enable CORS
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins,
                                builder =>
                                {
                                    builder.AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .WithOrigins("http://localhost:3000");
                                });
            });

            var server = Configuration["DBServer"]  ?? "ms-sql-server";
            var port = Configuration["DBPort"] ?? "1433";
            var user = Configuration["DBUser"] ?? "SA";
            var password = Configuration["DBPassword"] ?? "P@55w0rd2020";
            var database = Configuration["Database"] ?? "GamerDB";

            services.AddDbContext<GamerContext>(opt => opt.UseSqlServer($"Server={server},{port};Initial Catalog={database};User ID={user};Password={password}"));

            // Use only for testing
            // Services.AddScoped<IGameRepo, MockGameRepo>();

            // Add identity
            services.AddIdentity<User, IdentityRole>(options =>
                {
                    // configure identity options
                    options.Password.RequiredLength = 6;
                })
            .AddEntityFrameworkStores<GamerContext>()
            .AddDefaultTokenProviders();

            
            // Adding Authentication  
            services.AddAuthentication(options =>  
            {  
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;  
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;  
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;  
            })
  
            // Adding Jwt Bearer  
            .AddJwtBearer(options =>  
            {  
                options.SaveToken = true;  
                options.RequireHttpsMetadata = false;  
                options.TokenValidationParameters = new TokenValidationParameters()  
                {  
                    ValidateIssuer = true,  
                    ValidateAudience = true,  
                    ValidAudience = Configuration["JWT:Audience"],  
                    ValidIssuer = Configuration["JWT:Issuer"],  
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))  
                };  
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IGameRepo, SqlGameRepo>();
            services.AddScoped<IFriendRepo, SqlFriendRepo>();
            services.AddScoped<ILoanRepo, SqlLoanRepo>();

            services.AddControllers().AddNewtonsoftJson( s => {
                s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                s.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            // }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            PrepDB.PrepPopulation(app);
        }
    }
}
