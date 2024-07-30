using backend;

public static class ConnectionString
{
    public static readonly string Value;

    static ConnectionString()
    {
        Value = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        if (string.IsNullOrEmpty(Value))
        {
            throw new InvalidOperationException(
                "Database connection string not found in environment variable."
            );
        }
    }
}
