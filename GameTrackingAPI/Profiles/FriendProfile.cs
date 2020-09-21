using AutoMapper;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Profiles
{
    public class FriendProfile : Profile
    {
        public FriendProfile()
        {
            CreateMap<Friend, FriendReadDto>();
            CreateMap<FriendCreateDto, Friend>();
        }
        
    }
}