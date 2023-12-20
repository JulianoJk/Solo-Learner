import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/api';

export const useGetCurrentUser = (userToken: string) => {
  return useQuery(
    ['getCurrentUser', userToken],
    async () => {
      const response = await getCurrentUser(userToken);

      if (response.status === 'success') {
        return response;
      } else {
        return;
      }
    },
    {
      enabled: !!userToken.trim(), // Execute the query only if userToken is not empty
    },
  );
};
