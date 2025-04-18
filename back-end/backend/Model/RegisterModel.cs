public class Country
{
    public string? Name { get; set; }
    public string? Flag { get; set; }
}
public class RegisterModel
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Gender { get; set; }
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }
    public string? Password { get; set; }
    public string? ConfirmPassword { get; set; }
    public CountryModel? Country { get; set; }
    public string PhoneNumber { get; set; }
    public string? Picture { get; set; }

    public string Role { get; set; } = "Student";

    public List<int>? AssignedUsers { get; set; }
}
