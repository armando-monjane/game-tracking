using System;
using System.Collections.Generic;
using System.Linq;
using GameTrackingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GameTrackingAPI.Data
{
    public class SqlGameRepo : IGameRepo
    {
        private readonly GamerContext _context;

        public SqlGameRepo(GamerContext context)
        {
            _context = context;
        }

        public void CreateGame(Game game)
        {
            if (game == null) 
            {
                throw new ArgumentNullException(nameof(game));
            }

            _context.Games.Add(game);
        }

        public void DeleteGame(Game game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            _context.Games.Remove(game);
        }

        public IEnumerable<Game> GetAllGames()
        {
            return _context.Games
            .Include(g => g.Loans.Where(l => l.Status.Equals("Activo")))
            .ThenInclude(l => l.Friend).ToList();
        }

        public Game GetGameById(int id)
        {
            return _context.Games.FirstOrDefault(g => g.GameId == id);
        }

        public bool saveChanges()
        {
            return (_context.SaveChanges() > 0);
        }

        public void UpdateGame(Game game)
        {
            
        }
    }
}