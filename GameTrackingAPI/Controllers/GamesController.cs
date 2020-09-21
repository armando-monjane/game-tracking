using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GameTrackingAPI.Data;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace GameTrackingAPI.Controllers
{

    // api/games
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IGameRepo _repository;
        private readonly IMapper _mapper;

        public GamesController(UserManager<User> userManager, IGameRepo repository, IMapper mapper)
        {
            _userManager = userManager;
            _repository = repository;
            _mapper = mapper;
        }

        //GET api/games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameReadDto>>> GetUserGames() {

            var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);

            var games = _repository.GetAllGames().Where(g => g.IdentityId == user.Id);    

            return Ok(_mapper.Map<IEnumerable<GameReadDto>>(games));
        }

        //GET api/games/{id}
        [HttpGet("{id}", Name="GetGameById")]
        public ActionResult<GameReadDto> GetGameById(int id) {

            var game = _repository.GetGameById(id);
            
            if(game != null) {
                return Ok(_mapper.Map<GameReadDto>(game));
            }

            return NotFound();
        }


        //POST api/games
        [HttpPost]
        public async Task<ActionResult<GameReadDto>> CreateGame(GameCreateDto gameCreateDto) {

            var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);

            var game = _mapper.Map<Game>(gameCreateDto);

            game.Identity = user;

            _repository.CreateGame(game);
            _repository.saveChanges();
                
            var gameReadDto = _mapper.Map<GameReadDto>(game);

            return CreatedAtRoute(nameof(GetGameById), new {Id = gameReadDto.GameId}, gameReadDto);
        }


        //PUT api/games/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateGame(int id, GameUpdateDto gameUpdateDto) {
            
            var gameFromRepo = _repository.GetGameById(id);

            if (gameFromRepo == null) {
                return NotFound();
            }

            _mapper.Map(gameUpdateDto, gameFromRepo);

            _repository.UpdateGame(gameFromRepo);
            _repository.saveChanges();

            return NoContent();
        }


        //PATCH api/games/{id}
        [HttpPatch("{id}")]
        public ActionResult PartialGameUpdate(int id, JsonPatchDocument<GameUpdateDto> patchDocument) {
            
            var gameFromRepo = _repository.GetGameById(id);

            if (gameFromRepo == null) {   
                return NotFound();
            }

            var gameToPatch = _mapper.Map<GameUpdateDto>(gameFromRepo);
            patchDocument.ApplyTo(gameToPatch, ModelState);

            if (!TryValidateModel(gameToPatch)) {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(gameToPatch, gameFromRepo);
            _repository.UpdateGame(gameFromRepo);
            _repository.saveChanges();

            return NoContent();

        }


        //DELETE api/games/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteGame(int id) {

            var gameFromRepo = _repository.GetGameById(id);

            if (gameFromRepo == null) {   
                return NotFound();
            }

            _repository.DeleteGame(gameFromRepo);
            _repository.saveChanges();

            return NoContent();
        }


    //TODO: Implement method to return all games to admin rule
    }
}