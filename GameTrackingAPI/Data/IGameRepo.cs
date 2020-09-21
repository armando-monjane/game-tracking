using System.Collections.Generic;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Data
{
    public interface IGameRepo
    {
        bool saveChanges();
         IEnumerable<Game> GetAllGames();
         Game GetGameById(int id);
         void CreateGame(Game game);
         void UpdateGame(Game game);
         void DeleteGame(Game game);
    }
}