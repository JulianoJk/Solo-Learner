import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/api';

export const useGetCurrentUser = (userToken: string) => {
  return useQuery(
    ['getCurrentUser', userToken],
    async () => {
      // Always perform the query, but return null or undefined if the condition is not met
      if (userToken.trim() === '') {
        return null;
      }

      const response = await getCurrentUser(userToken);

      if (response.status === 'success') {
        return response;
      } else {
        return null;
      }
    },
    {
      enabled: !!userToken.trim(), // Execute the query only if userToken is not empty
    },
  );
};
