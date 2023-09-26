import { useQuery } from '@tanstack/react-query';
import { getGoogleClientIdAPI } from '../api/api';

export function useGetGoogleClientId() {
  return useQuery(['getClientUseHook'], async () => {
    const data = await getGoogleClientIdAPI();
    sessionStorage.setItem('clientId', data);
    return data;
  });
}
