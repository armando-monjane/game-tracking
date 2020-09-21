using System.Collections.Generic;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Data
{
    public class MockGameRepo : IGameRepo
    {
        public void DeleteGame(Game game)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Game> GetAllGames()
        {
            var games = new List<Game> 
            {
                new Game{GameId = 1, Description ="Lorem ipsum", Title = "God Of War"},
                new Game{GameId = 2, Description ="Lorem ipsum", Title = "The Order"},
                new Game{GameId = 3, Description ="Lorem ipsum", Title = "Uncharted 4"}

            };

            return games;
        }

        public Game GetGameById(int id)
        {
            return new Game{GameId = 1, Description ="Lorem ipsum", Title = "God Of War"};
        }

        public void UpdateGame(Game game)
        {
            throw new System.NotImplementedException();
        }

        void IGameRepo.CreateGame(Game game)
        {
            throw new System.NotImplementedException();
        }

        bool IGameRepo.saveChanges()
        {
            throw new System.NotImplementedException();
        }
    }
}