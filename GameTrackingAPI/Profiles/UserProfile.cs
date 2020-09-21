using AutoMapper;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Profiles
{
    public class UserProfile : Profile
    {

        public UserProfile()
        {
            CreateMap<UserCreateDto, User>().ForMember(user => user.UserName, map => map.MapFrom(dto => dto.Email));
            CreateMap<User, UserReadDto>();
        }
        
    }
}