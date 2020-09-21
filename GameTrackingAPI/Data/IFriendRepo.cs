using System.Collections.Generic;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Data
{
    public interface IFriendRepo
    {
        bool saveChanges();
         IEnumerable<Friend> GetAllFriends();
         Friend GetFriendById(int id);
         void CreateFriend(Friend friend);
         void UpdateFriend(Friend friend);
         void DeleteFriend(Friend friend);
    }
}