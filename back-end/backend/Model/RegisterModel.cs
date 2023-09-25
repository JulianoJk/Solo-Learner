namespace backend;

public class RegisterModel
{
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Username { get; set; }
    public string Gender { get; set; }
    public string? Password { get; set; }
    public string? ConfirmPassword { get; set; }
    public byte[]? Salt { get; set; }
    public bool isTeacher { get; set; }
}
