public static class JwtExpiration
{
    public static readonly int Value;

    static JwtExpiration()
    {
        var expirationString = Environment.GetEnvironmentVariable("JWT_EXPIRATION_SECONDS");
        if (!int.TryParse(expirationString, out var expirationSeconds))
        {
            throw new InvalidOperationException(
                "JWT expiration time not found or invalid in environment variable."
            );
        }
        Value = expirationSeconds;
    }
}
