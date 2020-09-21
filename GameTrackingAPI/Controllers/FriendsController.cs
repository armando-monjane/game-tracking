using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GameTrackingAPI.Data;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GameTrackingAPI.Controllers
{
    // api/friends
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IFriendRepo _repository;
        private readonly IMapper _mapper;

        public FriendsController(UserManager<User> userManager, IFriendRepo repository, IMapper mapper)
        {
            _userManager = userManager;
            _repository = repository;
            _mapper = mapper;
            
        }

        //GET api/friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FriendReadDto>>> GetUserFriends() {

            var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);

            var friends = _repository.GetAllFriends().Where(f => f.IdentityId == user.Id);

            return Ok(_mapper.Map<IEnumerable<FriendReadDto>>(friends));
        }


        //GET api/friends/{id}
        [HttpGet("{id}", Name = "GetFriendById")]
        public ActionResult<FriendReadDto> GetFriendById(int id) 
        {
            var friend = _repository.GetFriendById(id);

            if (friend != null) {
                return Ok(_mapper.Map<FriendReadDto>(friend));
            }

            return NotFound();

        }


        //POST api/friends
        [HttpPost]
        public async Task<ActionResult<FriendReadDto>> CreateFriend(FriendCreateDto friendCreateDto) 
        {
            var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);

            var friend = _mapper.Map<Friend>(friendCreateDto);

            friend.Identity = user;

            _repository.CreateFriend(friend);
            _repository.saveChanges();

            var friendReadDto = _mapper.Map<FriendReadDto>(friend);

            return CreatedAtRoute(nameof(GetFriendById), new {Id = friendReadDto.Id}, friendReadDto);

        }

        //PUT api/friends/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateFriend(int id, FriendCreateDto friendCreateDto) {

            var friendFromRepo = _repository.GetFriendById(id);

            if (friendFromRepo == null) {
                return NotFound();
            }

            _mapper.Map(friendCreateDto, friendFromRepo);

            _repository.UpdateFriend(friendFromRepo);
            _repository.saveChanges();

            return NoContent();
        }

        //DELETE api/friends/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteFriend(int id) {

            var friendFromRepo = _repository.GetFriendById(id);

            if (friendFromRepo == null) {
                return NotFound();
            }

            _repository.DeleteFriend(friendFromRepo);
            _repository.saveChanges();

            return NoContent();
        }


        //TODO: Implement method to return all friends to admin rule
        
    }
}