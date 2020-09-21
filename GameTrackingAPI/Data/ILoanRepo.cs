using System.Collections.Generic;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Data
{
    public interface ILoanRepo
    {
        bool saveChanges();
         IEnumerable<Loan> GetAllLoans();
         Loan GetLoanById(int id);
         void CreateLoan(Loan loan);
         void UpdateLoan(Loan loan);
         void DeleteLoan(Loan loan);

         
    }
}