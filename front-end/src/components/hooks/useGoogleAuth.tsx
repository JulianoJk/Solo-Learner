import { useGoogleLogin } from '@react-oauth/google';

export function useGoogleAuth() {
  return useGoogleLogin({
    onSuccess: async ({ code }: any) => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Change the content type to application/json
          },
          body: JSON.stringify({
            code,
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          return data;
        } else {
          console.error('Authentication failed:', response.statusText);
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error to handle it in the component
      }
    },
    flow: 'auth-code',
  });
}
