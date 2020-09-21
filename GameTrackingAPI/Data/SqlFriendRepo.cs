using System;
using System.Collections.Generic;
using System.Linq;
using GameTrackingAPI.Models;

namespace GameTrackingAPI.Data
{
    public class SqlFriendRepo : IFriendRepo
    {
        private readonly GamerContext _context;

        public SqlFriendRepo(GamerContext context)
        {
            _context = context;
            
        }
        public void CreateFriend(Friend friend)
        {
            if (friend == null) 
            {
                 throw new ArgumentNullException(nameof(friend));
            }

            _context.Friends.Add(friend);
        }

        public void DeleteFriend(Friend friend)
        {
            if (friend == null) 
            {
                throw new ArgumentNullException(nameof(friend));
            }

            _context.Remove(friend);
        }

        public IEnumerable<Friend> GetAllFriends()
        {
            return _context.Friends.ToList();
        }

        public Friend GetFriendById(int id)
        {
            return _context.Friends.FirstOrDefault(f => f.Id == id);
        }

        public bool saveChanges()
        {
            return (_context.SaveChanges() > 0);
        }

        public void UpdateFriend(Friend friend) 
        {
            
        }


    }
}