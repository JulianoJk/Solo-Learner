using System;

namespace backend
{
    public static class GoogleClientSecretEnv
    {
        public static readonly string Value;

        static GoogleClientSecretEnv()
        {
            Value = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");
            if (string.IsNullOrEmpty(Value))
            {
                throw new InvalidOperationException(
                    "GOOGLE_CLIENT_SECRET not found in environment variable."
                );
            }
        }
    }
}
