using System;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
        public string Password { get; set; }
        public bool IsTeacher { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
        public DateTime LastActive { get; set; }
    }
}
