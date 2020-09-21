using AutoMapper;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Profiles
{
    public class LoanProfile : Profile
    {
        public LoanProfile()
        {
            CreateMap<Loan, LoanReadDto>();
            CreateMap<LoanCreateDto, Loan>();
        }
        
    }
}