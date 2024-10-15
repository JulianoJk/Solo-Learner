using System;

namespace backend
{
    public static class ApiUrl
    {
        public static readonly string Value;

        static ApiUrl()
        {
            Value = Environment.GetEnvironmentVariable("API_URL") ?? "http://localhost:3001";
            if (string.IsNullOrEmpty(Value))
            {
                throw new InvalidOperationException("API_URL not found in environment variable.");
            }
        }
    }
}
