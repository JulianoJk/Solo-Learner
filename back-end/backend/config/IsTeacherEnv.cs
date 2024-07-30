using System;
using backend;

namespace backend
{
    public static class IsTeacherEnv
    {
        public static readonly string Value;

        static IsTeacherEnv()
        {
            Value = Environment.GetEnvironmentVariable("TEACHER_EMAIL");
            if (string.IsNullOrEmpty(Value))
            {
                throw new InvalidOperationException("TEACHER_EMAIL not found in environment variable.");
            }
        }
    }
}
