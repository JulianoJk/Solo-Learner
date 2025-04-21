using backend.Models;

public class RegisterModel
{
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? LastName { get; set; }
    public string? Gender { get; set; }
    public string? Password { get; set; }
    public string? ConfirmPassword { get; set; }
    public string? Picture { get; set; }
    public string? PhoneNumber { get; set; }

    public bool IsTeacher { get; set; }
    public bool IsStudent { get; set; }
    public string? Role { get; set; }

    public Country? Country { get; set; }
    public List<int>? AssignedUsers { get; set; }
    public bool IsAdminRegister { get; set; }
    public bool MustChangePassword { get; set; }

}
