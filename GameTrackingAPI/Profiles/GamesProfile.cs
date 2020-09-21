using AutoMapper;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Profiles
{
    public class GamesProfile : Profile
    {
        public GamesProfile()
        {
            CreateMap<Game, GameReadDto>();
            CreateMap<GameCreateDto, Game>();
            CreateMap<GameUpdateDto, Game>();
            CreateMap<Game, GameUpdateDto>();
            
        }
        
    }
}