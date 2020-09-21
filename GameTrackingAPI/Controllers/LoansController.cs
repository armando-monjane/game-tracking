using System;
using System.Linq;
using AutoMapper;
using GameTrackingAPI.Data;
using GameTrackingAPI.Dtos;
using GameTrackingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameTrackingAPI.Controllers
{
    // api/loans
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LoansController : ControllerBase
    {
        private readonly ILoanRepo _repository;
        private readonly IMapper _mapper;

        public LoansController(ILoanRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
            
        }

        //GET api/loans/{id}
        [HttpGet("{id}", Name = "GetLoanById")]
        public ActionResult<LoanReadDto> GetLoanById(int id) {

            var loan = _repository.GetLoanById(id);

            if(loan != null) {
                return Ok(_mapper.Map<LoanReadDto>(loan));
            }

            return NotFound();

        }
        
        //POST api/loans
        [HttpPost()]
        public ActionResult<LoanReadDto> CreateLoan(LoanCreateDto loanCreateDto) {

            var loan = _repository.GetAllLoans()
                                  .Where(l => (l.GameId == loanCreateDto.GameId) && (l.Status.Equals("Activo")))
                                  .FirstOrDefault();

            if (loan != null) {
                loan.Status = "Devolvido";
                _repository.UpdateLoan(loan);
                _repository.saveChanges();
            }

            var loanToCreate = _mapper.Map<Loan>(loanCreateDto);

            loanToCreate.Status = "Activo";
            loanToCreate.DataEmprestimo = new DateTime();

            _repository.CreateLoan(loanToCreate);
            _repository.saveChanges();

            var loanReadDto = _mapper.Map<LoanReadDto>(loanToCreate);

            return CreatedAtRoute(nameof(GetLoanById), new {Id = loanReadDto.Id}, loanReadDto);

        }


        //PUT api/loans/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateGame(int id, LoanUpdateDto loanDto) {

            var loanFromRepo = _repository.GetLoanById(id);

            if (loanDto == null) {
                return NotFound();
            }

            loanFromRepo.Status = loanDto.Status;
            loanFromRepo.DataDevolucao = new DateTime();

            _repository.UpdateLoan(loanFromRepo);
            _repository.saveChanges();

            return NoContent();
        }
    }
}