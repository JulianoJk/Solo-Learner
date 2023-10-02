import { useGoogleLogin } from '@react-oauth/google';

export function useGoogleAuth() {
  return useGoogleLogin({
    onSuccess: async ({ code }: any) => {
      try {
        const response = await fetch('http://localhost:3001/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error to handle it in the component
      }
    },
    flow: 'auth-code',
  });
}
