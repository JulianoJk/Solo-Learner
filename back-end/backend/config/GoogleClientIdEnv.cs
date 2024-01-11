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
