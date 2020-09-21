using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using GameTrackingAPI.Helpers;
using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;  
using Microsoft.IdentityModel.Tokens;  
using System;    
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using GameTrackingAPI.Dtos;
using Microsoft.AspNetCore.Http;

namespace GameTrackingAPI.Controllers
{
    // api/authenticate
    [Route("api/[controller]")]  
    [ApiController] 
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        //POST api/authenticate/register
        [HttpPost]  
        [Route("register")]  
        public async Task<IActionResult> Register(UserCreateDto model)  
        {  
            var userExists = await _userManager.FindByNameAsync(model.Email);  
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });  
  
            User user = new User()
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                SecurityStamp = Guid.NewGuid().ToString(),  
                UserName = model.Email
            };  
            var result = await _userManager.CreateAsync(user, model.Password);  
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
  
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });  
        }


        //POST api/authenticate/login
        [HttpPost]  
        [Route("login")]  
        public async Task<IActionResult> Login(UserLogin model)  
        {  
            var user = await _userManager.FindByNameAsync(model.Username);  
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))  
            {  
                var userRoles = await _userManager.GetRolesAsync(user);  
  
                var authClaims = new List<Claim>  
                {  
                    new Claim(ClaimTypes.Name, user.UserName),  
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),  
                };  
  
                foreach (var userRole in userRoles)  
                {  
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));  
                }  
  
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));  
  
                var token = new JwtSecurityToken(  
                    issuer: _configuration["JWT:Issuer"],  
                    audience: _configuration["JWT:Audience"],  
                    expires: DateTime.Now.AddHours(3),  
                    claims: authClaims,  
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)  
                    );  
  
                return Ok(new
                {
                    fullName = user.FirstName + " " + user.LastName,
                    email = user.Email,
                    token = new JwtSecurityTokenHandler().WriteToken(token),  
                    expiration = token.ValidTo
                });  
            }
             
            return Unauthorized();  
        } 
        
    }
}