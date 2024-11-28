using System;

namespace backend
{
    public static class GoogleClientIdEnv
    {
        public static readonly string Value;

        static GoogleClientIdEnv()
        {
            Value = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
            if (string.IsNullOrEmpty(Value))
            {
                throw new InvalidOperationException(
                    "GOOGLE_CLIENT_ID not found in environment variable."
                );
            }
        }
    }
}

public static class JwtKeyEnv
{
    public static readonly string Value;

    static JwtKeyEnv()
    {
        Value = Environment.GetEnvironmentVariable("JWT_KEY");
        if (string.IsNullOrEmpty(Value))
        {
            throw new InvalidOperationException(
                "JWT_KEY not found in environment variable."
            );
        }
    }
}

public static class SmtpHostEnv
{
    public static readonly string Value;

    static SmtpHostEnv()
    {
        Value = Environment.GetEnvironmentVariable("SMTP_HOST");
        if (string.IsNullOrEmpty(Value))
        {
            throw new InvalidOperationException(
                "SMTP_HOST not found in environment variable."
            );
        }
    }
}

public static class SmtpPortEnv
{
    public static readonly int Value;

    static SmtpPortEnv()
    {
        var port = Environment.GetEnvironmentVariable("SMTP_PORT");
        if (string.IsNullOrEmpty(port) || !int.TryParse(port, out int result))
        {
            throw new InvalidOperationException(
                "SMTP_PORT not found or is invalid in environment variable."
            );
        }
        Value = result;
    }
}

public static class EmailFromEnv
{
    public static readonly string Value;

    static EmailFromEnv()
    {
        Value = Environment.GetEnvironmentVariable("EMAIL_FROM");
        if (string.IsNullOrEmpty(Value))
        {
            throw new InvalidOperationException(
                "EMAIL_FROM not found in environment variable."
            );
        }
    }
}

public static class EmailPasswordEnv
{
    public static readonly string Value;

    static EmailPasswordEnv()
    {
        Value = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");
        if (string.IsNullOrEmpty(Value))
        {
            throw new InvalidOperationException(
                "EMAIL_PASSWORD not found in environment variable."
            );
        }
    }
}

// Add more classes as needed for other environment variables (e.g., DB credentials, IP address, etc.)