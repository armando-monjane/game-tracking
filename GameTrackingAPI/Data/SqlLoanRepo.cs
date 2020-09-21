using System;
using System.Collections.Generic;
using System.Linq;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Data
{
    public class SqlLoanRepo : ILoanRepo
    {

        private readonly GamerContext _context;

        public SqlLoanRepo(GamerContext context)
        {
            _context = context;
        }

        public void CreateLoan(Loan loan)
        {
            if (loan == null) 
            {
                 throw new ArgumentNullException(nameof(loan));
            }

            _context.Loans.Add(loan);
        }

        public void DeleteLoan(Loan loan)
        {
             if (loan == null) 
            {
                 throw new ArgumentNullException(nameof(loan));
            }

            _context.Remove(loan);
        }

        public IEnumerable<Loan> GetAllLoans()
        {
            return _context.Loans.ToList();
        }

        public Loan GetLoanById(int id)
        {
            return _context.Loans.FirstOrDefault(l => l.Id == id);
        }

        public Loan GetLoanByGameIdAndFriendId(int gameId, int friendId) {
            return _context.Loans.FirstOrDefault(l => (l.GameId == gameId) && (l.FriendId == friendId));
        } 
        public bool saveChanges()
        {
            return (_context.SaveChanges() > 0);
        }

        public void UpdateLoan(Loan loan)
        {
            
        }
    }
}