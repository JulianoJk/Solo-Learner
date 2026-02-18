using backend;

/// <summary>
/// PostgreSQL connection string from environment (CONNECTION_STRING).
/// Accepts standard Npgsql format, e.g.:
/// Host=...;Port=5432;Database=...;Username=...;Password=...;Ssl Mode=Require
/// or URI: postgresql://user:password@host:port/database
/// </summary>
public static class ConnectionString
{
    public static readonly string Value;

    static ConnectionString()
    {
        Value = Environment.GetEnvironmentVariable("CONNECTION_STRING")
            ?? throw new InvalidOperationException(
                "Database connection string not found in environment variable (CONNECTION_STRING).");
    }
}
