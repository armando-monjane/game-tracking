using System.Threading.Tasks;
using AutoMapper;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Helpers;
using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GameTrackingAPI.Controllers
{
    // api/users
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UsersController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
            
        }

        // POST api/users
        [HttpPost]
        public async Task<IActionResult> Post(UserCreateDto userCreateDto)
        {

            var userIdentity = _mapper.Map<User>(userCreateDto);

            var result = await _userManager.CreateAsync(userIdentity, userCreateDto.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            return Ok(new Response{ Status = "Success", Message = "User created successfully!" });
        }


        // TODO: authorize for admins only
    }
}