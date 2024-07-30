using System;
using backend;

namespace backend
{
    public static class JwtKey
    {
        public static readonly string Value;

        static JwtKey()
        {
            Value = Environment.GetEnvironmentVariable("JWT_KEY");
            if (string.IsNullOrEmpty(Value))
            {
                throw new InvalidOperationException("JWT key not found in environment variable.");
            }
        }
    }
}
