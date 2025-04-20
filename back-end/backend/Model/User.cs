using System;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
        public string Password { get; set; }
        public bool IsTeacher { get; set; }
        public bool IsStudent { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public String Picture { get; set; }
        public bool IsUserLoggedIn { get; set; }
        public bool Country { get; set; }
        public bool Phone { get; set; }
    }
}